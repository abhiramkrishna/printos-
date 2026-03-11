import type { ElementType } from 'react';

export interface Category {
    id: string;
    title: string;
    icon: ElementType;
    desc: string;
    color: string;
    hoverText: string;
    hoverBg: string;
    text: string;
    bg: string;
    subItems: string[];
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    category: string;
    subCategory: string;
    price: string;
    oldPrice: string | null;
    rating: string;
    reviews: string;
    image: string;
    badge: string;
    tags: string;
    colors: string[];
    description: string;
}

export interface Testimonial {
    name: string;
    role: string;
    text: string;
    init: string;
}
