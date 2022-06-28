import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly productService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title')title: string, 
        @Body('description')description: string, 
        @Body('price')price: number
    ){
        const prodId = this.productService.insertProduct(title, description, price);
        return {id: prodId};
    }

    @Get()
    getProducts(){
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id')prodId: string){
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id')prodId: string,
        @Body('title')prodTitle: string, 
        @Body('description')prodDescription: string, 
        @Body('price')prodPrice: number
    ){
        this.productService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id')prodId: string){
        this.productService.deleteProduct(prodId);
        return null;
    }
}