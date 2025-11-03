'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className='product-card-link'>
            <div className='product-card'>
                <div className='product-img-wrapper'>
                    <Image width={500} height={500} className='product-img' src={product.images[0]} alt={product.name} />
                </div>
                <div className='product-info'>
                    <div>
                        <p className='product-title'>{product.name}</p>
                        <div className='rating-row'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon key={index} size={14} className='star-icon' fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                            ))}
                        </div>
                    </div>
                    <p className='product-price'>{currency}{product.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard