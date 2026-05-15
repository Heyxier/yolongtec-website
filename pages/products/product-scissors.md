---
layout: category
title: SCISSORS
category_slug: scissors
permalink: /products/scissors/
---

<section class="section products-section" style="padding-top: 120px;">
    <div class="section-bg">
        <img src="{{ "images/workshop-bg.jpg" | relative_url }}" alt="Workshop Background">
        <div class="section-overlay"></div>
    </div>
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">SCISSORS</h2>
            <p class="section-desc">4V electric scissors</p>
        </div>

        <div class="products-grid">
            {% assign cat_products = site.products 
                | where: "category", "scissors" 
                | where: "status", true 
                | sort: "model" %}
            {% if cat_products.size > 0 %}
            {% for product in cat_products %}
            <div class="product-card">
                <div class="product-image">
                    <img src="{{ product.image | relative_url }}" alt="{{ product.name }}" loading="lazy">
                    <div class="product-overlay">
                        <a href="{{ product.url | relative_url }}" class="btn btn-accent">VIEW DETAILS</a>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-desc">{{ product.model }}{% if product.voltage %} | {{ product.voltage }}{% endif %}{% if product.torque %} | {{ product.torque }}{% endif %}</p>
                </div>
            </div>
            {% endfor %}
            {% else %}
            <div class="empty-state" style="text-align:center;padding:80px 20px;">
                <h3 style="color:var(--text-primary);font-size:1.5rem;margin-bottom:12px;">Products Coming Soon</h3>
                <p style="color:var(--text-muted);">Products in this category are being added. Check back later.</p>
            </div>
            {% endif %}
        </div>
    </div>
</section>
