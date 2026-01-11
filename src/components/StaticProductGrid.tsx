import ProductCard from "./ProductCard";
import productEarbuds from "@/assets/TERRIVO WEB IMAGE 02.png";
import productSmartwatch from "@/assets/TERRIVO WEB IMAGE 03.png";
import productPowerbank from "@/assets/TERRIVO WEB IMAGE 04.png";
import productHeadphones from "@/assets/TERRIVO WEB IMAGE 05 - Copy.png";

const products = [
    {
        id: "1",
        name: "Terrivo Multi-Purpose Storage Bag (Pack of 2)",
        price: "",
        image: productEarbuds,
        description: "Includes | 2 × Large cotton canvas storage bags | Suitable for sarees, lehengas, quilts, and seasonal clothing | Structured design for stackable wardrobe storage",
        amazonLink: "https://amzn.in/d/4Hkx4Uh",
        flipkartLink: "https://www.flipkart.com/terrivo-fabric-storage-organizer-cotton-canvas-bag-saree-clothes-zip-pack-2-trv-st002/p/itm888ace0c275b1?pid=GCVHJB7B8TAA5RNY",
    },
    {
        id: "2",
        name: "Terrivo Blouse Organizer (Pack of 2)",
        price: "",
        image: productSmartwatch,
        description: "Includes | 2 × Structured cotton canvas blouse organizers | Designed to maintain blouse shape and padding | Ideal for padded and embroidered blouses",
        amazonLink: "https://amzn.in/d/7Xjh7VT",
        flipkartLink: "https://www.flipkart.com/terrivo-fabric-blouse-organizer-wardrobe-cotton-canvas-transparent-window-trv-b002/p/itmb1c44ab6621a3?pid=GCVHJ9SN3ZJED9ZP",
    },
    {
        id: "3",
        name: "Terrivo Saree Cover (Pack of 3)",
        price: "",
        image: productPowerbank,
        description: "Includes | 3 × Cotton canvas saree covers | Designed to protect sarees from dust and prolonged folding | Suitable for daily and occasion wear sarees",
        amazonLink: "https://amzn.in/d/coxL6ff",
        flipkartLink: "https://www.flipkart.com/terrivo-fabric-storage-organizer-5-pc-heavy-duty-bridal-trousseau-kit-6-month-warranty-travel-wedding-lehenga/p/itmbf2b468de2cf5?pid=GCVHJCDQZXDQPR8J",
    },
    {
        id: "4",
        name: "Terrivo Bridal Storage Set",
        price: "",
        image: productHeadphones,
        description: "Includes | Blouse organizers for padded and embroidered blouses | Saree covers for folded bridal sarees | Multi-purpose storage bag for heavier garments",
        amazonLink: "https://amzn.in/d/iGZkfO4",
        flipkartLink: "",
    },
];

const StaticProductGrid = () => {
    return (
        <section className="section-padding bg-background">
            <div className="container-brand">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="heading-section mb-4">
                        Our <span className="text-primary">Products</span>
                    </h2>
                    <p className="text-lead">
                        Designed by Terrivo. Purchased where you already trust.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StaticProductGrid;
