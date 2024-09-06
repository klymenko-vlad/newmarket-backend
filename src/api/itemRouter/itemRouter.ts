import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/middleware.interface.js';
import { ParsedQs } from 'qs';

import express from 'express';
import authMiddleware from '../../middleware/auth.middleware.js';
import ProductModel from '../../models/ProductModel.js';

import {
  ERROR_NOT_AUTHENTICATED,
  ERROR_SERVER_ERROR,
} from '../../constants/errors.js';

import {
  ERROR_CANNOT_EDIT_PRODUCT,
  ERROR_DESCRIPTION_TOO_LONG,
  ERROR_MISSING_CATEGORY,
  ERROR_MISSING_MAIN_PICTURE,
  ERROR_MISSING_PICTURES,
  ERROR_MISSING_PRICE,
  ERROR_MISSING_QUANTITY,
  ERROR_NAME_DESCRIPTION_LENGTH,
  ERROR_NAME_TOO_LONG,
  ERROR_NO_PRODUCTS_FOUND,
  ERROR_PRODUCT_NOT_FOUND,
} from './constants.js';

const itemRouter = express.Router();

// Create a Product
itemRouter.post(
  '/',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const {
      name,
      price,
      mainPicture,
      pictures,
      description,
      quantity,
      category,
      rating,
      pastPrice,
    } = req.body;

    if (name.length < 1 || description.length < 1) {
      return res.status(400).send(ERROR_NAME_DESCRIPTION_LENGTH);
    }

    if (description.length > 500) {
      return res.status(400).send(ERROR_DESCRIPTION_TOO_LONG);
    }

    if (name.length > 25) {
      return res.status(400).send(ERROR_NAME_TOO_LONG);
    }

    if (!quantity) {
      return res.status(400).send(ERROR_MISSING_QUANTITY);
    }

    if (!pictures) {
      return res.status(400).send(ERROR_MISSING_PICTURES);
    }

    if (!price) {
      return res.status(400).send(ERROR_MISSING_PRICE);
    }

    if (!category) {
      return res.status(400).send(ERROR_MISSING_CATEGORY);
    }

    if (!mainPicture) {
      return res.status(400).send(ERROR_MISSING_MAIN_PICTURE);
    }

    if (!req.userId) {
      return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    interface INewProduct {
      user: string;
      name: any;
      pictures: any;
      description: any;
      quantity: any;
      price: any;
      category: any;
      mainPicture: any;
      rating?: string;
      pastPrice?: string;
    }

    try {
      const newProduct: INewProduct = {
        user: req.userId,
        name,
        pictures,
        description,
        quantity,
        price,
        category,
        mainPicture,
      };

      if (rating) newProduct.rating = rating;
      if (pastPrice) newProduct.pastPrice = pastPrice;
      if (pictures) newProduct.pictures = pictures;

      const product = await new ProductModel(newProduct).save();

      const productCreated = await ProductModel.findById(product._id).populate(
        'user',
      );

      return res.json(productCreated);
    } catch (error) {
      console.error(error);
      return res.status(500).send(ERROR_SERVER_ERROR);
    }
  },
);

// Get all Products
itemRouter.get('/', async (req: Request, res: Response) => {
  try {
    const queryObj: any = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (req.query.search) {
      queryObj.name = { $regex: req.query.search, $options: 'i' };
    }

    if (req.query.price) {
      const price = req.query.price as ParsedQs;

      const priceRange: {
        $gte?: number;
        $lte?: number;
      } = {};

      if (price.gte && !isNaN(Number(price.gte))) {
        priceRange.$gte = parseFloat(price.gte as string);
      }
      if (price.lte && !isNaN(Number(price.lte))) {
        priceRange.$lte = parseFloat(price.lte as string);
      }
      if (Object.keys(priceRange).length > 0) {
        queryObj.price = priceRange;
      }
    }

    let sortBy = req.query.sort as string;
    if (req.query.sort) {
      sortBy = sortBy.split(',').join(' ') + ' _id';
    }

    let fieldsDel = req.query.fields as string;
    if (req.query.fields) {
      fieldsDel = fieldsDel.split(',').join(' ');
    } else {
      fieldsDel = '-__v';
    }

    const numProducts = await ProductModel.countDocuments();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const product = await ProductModel.find(queryObj)
      .select(fieldsDel)
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .populate('user');

    if (skip > numProducts) {
      return res.status(204).json({
        status: 'NoItems',
        results: [],
      });
    }

    res.status(200).json({
      status: 'success',
      total: numProducts,
      results: product.length,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(ERROR_SERVER_ERROR);
  }
});

// Get one Product
itemRouter.get('/:productId', async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.productId).populate(
      'user',
    );

    if (!product) {
      return res.status(404).send(ERROR_PRODUCT_NOT_FOUND);
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send(ERROR_SERVER_ERROR);
  }
});

// Get All Products of user
itemRouter.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    let sortBy = req.query.sort as string;

    if (req.query.sort) {
      sortBy = sortBy.split(',').join(' ');
    }

    let fieldsDel = req.query.fields as string;
    if (req.query.fields) {
      fieldsDel = fieldsDel.split(',').join(' ');
    } else {
      fieldsDel = '-__v';
    }

    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    queryObj.user = req.params.userId;

    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );

    const numProducts = await ProductModel.countDocuments(queryStr as any);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const product = await ProductModel.find(queryStr as any)
      .select(fieldsDel)
      .populate('user')
      .skip(skip)
      .limit(limit)
      .sort(sortBy);

    if (product.length === 0) {
      return res.status(404).json({ message: ERROR_NO_PRODUCTS_FOUND });
    }

    res.status(200).json({
      status: 'success',
      total: numProducts,
      results: product.length,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(ERROR_SERVER_ERROR);
  }
});

// Update Product
itemRouter.put(
  '/:productId',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req;

    try {
      const product = await ProductModel.findById(
        req.params.productId,
      ).populate('user');

      if (!product) {
        return res.status(404).send(ERROR_PRODUCT_NOT_FOUND);
      }

      const isUser = product.user._id.toString() === userId;

      if (!isUser) {
        return res.status(404).send(ERROR_CANNOT_EDIT_PRODUCT);
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

      res.status(200).json({
        status: 'success',
        data: updatedProduct,
      });
    } catch (error: any) {
      console.error(error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'fail',
          message: error.message,
        });
      }

      res.status(404).json({
        status: 'fail',
        message: error,
      });
    }
  },
);

export default itemRouter;
