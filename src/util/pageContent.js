import React from "react"

export const all_landing_pages = [
    "ai_headshot_generator", 
    "ai_anime_portrait", 
    "ai_text_to_image",
    "ai_tattoo_generator",
    "ai_logo_generator",
    "ai_profile_picture_generator",
    "tattoo_text_generator",
    "ai_id_photo_maker",
    "anime_pfp_maker",
    "ai_digital_avatar",
    "anime_character_creator",
    "ai_face_generator",
    "emoji_copy_paste",
    "face_text",
    "pixel_art_generator",
    "furry_art_generator",
    "kawaii_face",
    "fancy_font",
    "cool_symbols",
]

export const all_random_generator_items = [
    "animal",
    "3d-pokemon",
    "character",
    "furry-art",
    "landscape",
    "superhero",
    "vehicle",
    "weapon",

    "spider-man-art",
    "chibi-character",
    "warrior-art",
    "loli-art",
    "dwayne-johnson-images",
    "lake-photo",
    "pixar-art",
    "handcrafts",
    "papercut-art",
    "uniform-design",
    "blacklight-art",
    "deepfake-image",
    "partner-image",
    "lamp-design",
    "gta-v-art",
    "vase-art",
    "college-photo",
    "fusion-art",
    "pony-image",
    "quotes-image",
    "soccer-badge",
    "cute-watercolor-art",
    "cartoons-comics",
    "phantom-image",
    "realistic-image",
    "vector-black-white",
    "anime-cat-art",
    "wood-board-texture",


    // "90s-yearbook",
    // "airport-scene",
    // "semi-realistic-art",
    // "outfit-clothes",
    // "manga-lines",
    // "stuff-images",
    // "game-texture",
    // "acts-of-kindness-images",
    // "farm-animals-image",
    // "dunk-design",
    // "japanese-animal-art",
    // "hyper-realistic-image",
    // "amusement-park-art",
    // "liminal-spaces-art",
    // "star-wars-portrait",
    // "forest-village-art",
    // "free-kitchen-layout",
    // "character-sheet-sketch",
    // "dripping-ink-art",
    // "fantasy-deco",
    // "pulp-comic-art",
    // "steampunk-illustration",
    // "trippy-illustration",
    // "delft-blue-art",
    // "magical-creature-art",
    // "street-view-art",
    // "minimal-caricature",
    // "queso-image",
    // "fantasy-girl-art",
    // "post-apocalyptic-art",
    // "black-white-doodles",
  ];




export const homepage_functions_ai = (t) => {
    return [
        {
            title: t("anime_portrait_title"),
            des: t("anime_portrait_des"),
            btn: t("anime_portrait_btn"),
            image: "/images/pages/home/features/anime_portrait_before.webp",
            image_after: "/images/pages/home/features/anime_portrait_after.webp",
            link: "/app/anime-portrait",
            alt: "anime portrait maker",
        },
        {
            title: t("headshot_generator_title"),
            des: t("headshot_generator_des"),
            btn: t("headshot_generator_btn"),
            image: "/images/pages/home/features/real_portrait_before.webp",
            image_after: "/images/pages/home/features/real_portrait_after.webp",
            link: "/app/headshot-generator",
            alt: "headshot portrait maker",
        },
        {
            title: t("tattoo_generator_title"),
            des: t("tattoo_generator_des"),
            btn: t("tattoo_generator_btn"),
            image: "/images/pages/home/features/tattoo_generator_before.webp",
            image_after: "/images/pages/home/features/tattoo_generator_after.webp",
            link: "/app/tattoo-generator",
            alt: "tattoo generator",
        },
        {
            title: t("logo_generator_title"),
            des: t("logo_generator_des"),
            btn: t("logo_generator_btn"),
            image: "/images/pages/home/features/ai_logo_generator.webp",
            image_after: "/images/pages/home/features/ai_logo_generator.webp",
            link: "/app/logo-generator",
            alt: "logo image maker",
        },
        {
            title: t("random_generator_title"),
            des: t("random_generator_des"),
            btn: t("random_generator_btn"),
            image: "/images/pages/home/features/random_image_generator.webp",
            image_after: "/images/pages/home/features/random_image_generator.webp",
            link: "/app/random-image-generator",
            alt: "random image generator",
        },
    ]
}

export const create_recommendation_item = (t, page_name) => {
    const createItem = (titleKey, desKey, url, page_name) => ({
        title: t(titleKey),
        des: t(desKey),
        link: `/${page_name.replace(/_/g, "-")}`,
        name: page_name,
    });

    return createItem(`seo_title`, `main_des`, 'btn_target', page_name);
};

export const create_random_item = (t, category_item) => {
    const createItem = (item) => ({
        title: t(item+'_seo_title'),
        des: t(item+'_seo_des'),
        link: `/app/random-image-generator/${item.replace(/_/g, "-")}`,
        name: item,
    });

    return createItem(category_item);
};


export const faq_content_general = (t, number = 10) => {
    const createFAQItem = (titleKey, desKey) => ({
        title: t(titleKey),
        description: t(desKey),
    });

    const faqItems = [];
    for (let i = 1; i <= number; i++) {
        faqItems.push(createFAQItem(`question_${i}`, `answer_${i}`));
    }

    return faqItems;
};

export const faq_content_tools = (t) => {
    const createFAQItem = (titleKey, desKey) => ({
        title: t(titleKey),
        description: t(desKey),
    })

    return [
        createFAQItem("question_1", "answer_1"),
        createFAQItem("question_2", "answer_2"),
        createFAQItem("question_3", "answer_3"),
        createFAQItem("question_4", "answer_4"),
        createFAQItem("question_5", "answer_5"),
        // createFAQItem('question_6', 'answer_6'),
    ]
}

export const faq_content_pricing = (t) => {
    return [
        {
            title: t("question_1"),
            description: t("answer_1"),
        },
        {
            title: t("question_2"),
            description: t("answer_2"),
        },
        {
            title: t("question_3"),
            description: t("answer_3"),
        },
        {
            title: t("question_4"),
            description: t("answer_4"),
        },
        {
            title: t("question_5"),
            description: t("answer_5"),
        },
        {
            title: t("question_6"),
            description: t("answer_6"),
        },
        {
            title: t("question_7"),
            description: t("answer_7"),
        },
        {
            title: t("question_8"),
            description: t("answer_8"),
        },
        {
            title: t("question_9"),
            description: t("answer_9"),
        },
        {
            title: t("question_10"),
            description: t("answer_10"),
        },
    ]
}

export const homepage_content_items = (t) => {
    const createContentItem = (titleKey, descriptionKey, image, alt) => ({
        title: t(titleKey),
        description: t(descriptionKey),
        image: `/images/pages/home/detail/${image}`,
        alt,
    })

    return [
        createContentItem(
            "feature_1_title",
            "feature_1_des",
            "Detail_Anime.webp",
            "create anime portrait for free"
        ),
        createContentItem(
            "feature_2_title",
            "feature_2_des",
            "Detail_Headshots.webp",
            "real headshot generator for free"
        ),
        createContentItem(
            "feature_3_title",
            "feature_3_des",
            "Detail_Tattoo.webp",
            "online tattoo design and generator"
        ),
        createContentItem(
            "feature_4_title",
            "feature_4_des",
            "Detail_Flux.webp",
            "free text to image with Flux"
        ),
    ]
}

export const homepage_preview_items = (t) => {
    const createContentItem = (titleKey, subName, alt, num) => ({
        title: t(titleKey),
        images: [`/images/pages/home/preview/${num}_${subName}/${subName}_1.webp`,
            `/images/pages/home/preview/${num}_${subName}/${subName}_2.webp`,
            `/images/pages/home/preview/${num}_${subName}/${subName}_3.webp`,
            `/images/pages/home/preview/${num}_${subName}/${subName}_4.webp`,
        ],
        alt,
    })

    return [
        createContentItem(
            "preview_1_title",
            "Digital_Avatar",
            "create digital avatar with Vheer",
            "01"
        ),
        createContentItem(
            "preview_2_title",
            "Anime&Manga",
            "real headshot generator for free",
            "02"
        ),
        createContentItem(
            "preview_3_title",
            "Tattoo_Design",
            "samples to generate tattoo design",
            "03"
        ),
        createContentItem(
            "preview_4_title",
            "Product_Photo",
            "generate product photos with flux text to image",
            "04"
        ),
        createContentItem(
            "preview_5_title",
            "Wallpaper",
            "generate stunning wallpaper instantly",
            "05"
        ),
    ]
}

export const landing_preview_items = (t, page_name) => {
    const createContentItem = (titleKey, desKey, imageNameKey) => ({
        title: t(titleKey),
        des: t(desKey),
        image: `/images/landingPages/${page_name}/${imageNameKey}.webp`,
        alt: `${page_name} preview image`,
    });

    return [
        createContentItem('preview_title_1', 'preview_des_1', 'preview_image_1'),
        createContentItem('preview_title_2', 'preview_des_2', 'preview_image_2'),
        createContentItem('preview_title_3', 'preview_des_3', 'preview_image_3'),
    ];
};


export const features_content_items = (t, name) => {
    const createItem = (name) => [
        {
            title: t("feature_1_title"),
            description: t("feature_1_des"),
            image: `/images/landingPages/${name}/feature_image_1.webp`,
            alt: `${name} feature image 1`,
        },
        {
            title: t("feature_2_title"),
            description: t("feature_2_des"),
            image: `/images/landingPages/${name}/feature_image_2.webp`,
            alt: `${name} feature image 2`,
        },
    ];

    const items = {};
    all_landing_pages.forEach(page => {
        items[page] = createItem(page);
    });

    return items[name] || [];
};

export const howto_content_items = (t, name) => {
    const createItem = () => ({
        title: t("howto_title"),
        des: t("howto_des"),
        steps: [
            {
                title: t("step_1_title"),
                des: t("step_1_des"),
            },
            {
                title: t("step_2_title"),
                des: t("step_2_des"),
            },
            {
                title: t("step_3_title"),
                des: t("step_3_des"),
            },
            {
                title: t("step_4_title"),
                des: t("step_4_des"),
            },
            {
                title: t("step_5_title"),
                des: t("step_5_des"),
            },
        ],
    })

    const items = {
        anime_portrait: createItem(),
        real_portrait: createItem(),
        tattoo_design: createItem(),
        text_to_image: createItem(),
        logo_generator: createItem(),
        emoji_copy: createItem(),
        cool_symbols: createItem(),
        face_text: createItem(),
        furry_art_generator: createItem(),
        pixel_art_generator: createItem(),
        random_animal_generator: createItem(),
        random_image_generator: createItem(),
        background_remover: createItem(),
        blur_background: createItem(),
        home: createItem(),
    }

    return items[name] || []
}

export const icon_features_items = (t) => {
    const createFeatureItem = (titleKey, descriptionKey) => ({
        title: t(titleKey),
        description: t(descriptionKey),
        // icon,
    });

    return [
        createFeatureItem("icon_feature_1_title", "icon_feature_1_des"),
        createFeatureItem("icon_feature_2_title", "icon_feature_2_des"),
        createFeatureItem("icon_feature_3_title", "icon_feature_3_des"),
        createFeatureItem("icon_feature_4_title", "icon_feature_4_des"),
        createFeatureItem("icon_feature_5_title", "icon_feature_5_des"),
        createFeatureItem("icon_feature_6_title", "icon_feature_6_des"),
    ];
};

export const features_pricing = (t) => {
    const createFeatureItem = (titleKey, descriptionKey, svg = null) => ({
        title: t(titleKey),
        description: t(descriptionKey),
        svg,
    })

    const svg1 = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={36}
            height={36}
            fill={"none"}
        >
            <path
                d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M18.9 8C18.9656 7.67689 19 7.34247 19 7C19 4.23858 16.7614 2 14 2C11.2386 2 9 4.23858 9 7C9 7.34247 9.03443 7.67689 9.10002 8"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M7 7.99324H16C18.8284 7.99324 20.2426 7.99324 21.1213 8.87234C22 9.75145 22 11.1663 22 13.9961V15.9971C22 18.8269 22 20.2418 21.1213 21.1209C20.2426 22 18.8284 22 16 22H10C6.22876 22 4.34315 22 3.17157 20.8279C2 19.6557 2 17.7692 2 13.9961V11.9952C2 8.22211 2 6.33558 3.17157 5.16344C4.11466 4.2199 5.52043 4.03589 8 4H10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )

    const svg2 = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={36}
            height={36}
            fill={"none"}
        >
            <path
                d="M14 18C18.4183 18 22 14.4183 22 10C22 5.58172 18.4183 2 14 2C9.58172 2 6 5.58172 6 10C6 14.4183 9.58172 18 14 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M13.1669 20.9689C12.063 21.6239 10.7742 22 9.3975 22C5.31197 22 2 18.688 2 14.6025C2 13.2258 2.37607 11.937 3.03107 10.8331"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
    const svg3 = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={36}
            height={36}
            fill={"none"}
        >
            <path
                d="M15.5259 15.9772H18.7652C20.0444 15.9556 21.9986 16.6289 21.9986 19.0571C21.9986 21.5766 19.5871 21.999 18.7652 21.999C17.9433 21.999 10.1816 21.999 7.94429 21.999C5.4383 21.999 1.99999 21.4914 2 17.1681L2 8.00282H21.9986V12.5198M15.5259 15.9772C15.5313 15.7633 15.6223 15.5512 15.7991 15.3971L17.5009 13.9768M15.5259 15.9772C15.5202 16.2054 15.612 16.4357 15.8013 16.5996L17.5009 17.9832"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.00391 7.9912L2.92544 5.69028C3.67321 3.90211 4.04711 3.00803 4.80496 2.50463C5.56282 2.00122 6.53494 2.00122 8.47917 2.00122H15.4985C17.4427 2.00122 18.4148 2.00122 19.1727 2.50463C19.9306 3.00803 20.3044 3.90211 21.0522 5.69028L21.9981 7.99476"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M11.9629 8.00122V2.00122"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M9.96289 12.0012H13.9629"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
    const svg4 = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={36}
            height={36}
            fill={"none"}
        >
            <path
                d="M8.12901 11.1313L12.128 6.1907C12.4408 5.80431 13.027 6.0448 13.027 6.55951V10.3836C13.027 10.6919 13.2569 10.9419 13.5405 10.9419H15.4855C15.9274 10.9419 16.1629 11.5083 15.871 11.8689L11.872 16.8095C11.5592 17.1959 10.973 16.9554 10.973 16.4407V12.6167C10.973 12.3083 10.7431 12.0584 10.4595 12.0584H8.51449C8.07264 12.0584 7.83711 11.4919 8.12901 11.1313Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21 11.1835V8.28041C21 6.64041 21 5.82041 20.5959 5.28541C20.1918 4.75042 19.2781 4.49068 17.4507 3.97122C16.2022 3.61632 15.1016 3.18875 14.2223 2.79841C13.0234 2.26622 12.424 2.00012 12 2.00012C11.576 2.00012 10.9766 2.26622 9.77771 2.79841C8.89839 3.18875 7.79784 3.61632 6.54933 3.97122C4.72193 4.49068 3.80822 4.75042 3.40411 5.28541C3 5.82041 3 6.64041 3 8.28041V11.1835C3 16.8086 8.06277 20.1836 10.594 21.5195C11.2011 21.8399 11.5046 22.0001 12 22.0001C12.4954 22.0001 12.7989 21.8399 13.406 21.5195C15.9372 20.1836 21 16.8086 21 11.1835Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
    const svg5 = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={48}
            height={48}
            fill={"none"}
        >
            <path
                d="M18 11.5C18 11.5 13.5811 5.50001 12 5.5C10.4188 5.49999 6 11.5 6 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 18.5C18 18.5 13.5811 12.5 12 12.5C10.4188 12.5 6 18.5 6 18.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
    const svg6 = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={48}
            height={48}
            fill={"none"}
        >
            <path
                d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M18.6461 4.52795C18.2489 4.89346 18 5.41766 18 6C18 7.10457 18.8954 8 20 8C20.3793 8 20.7339 7.89441 21.0361 7.71103C21.6139 7.36038 22 6.72527 22 6C22 4.89543 21.1046 4 20 4C19.4778 4 19.0023 4.20016 18.6461 4.52795ZM18.6461 4.52795C16.8794 2.95541 14.5513 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6625 21.9833 11.3289 21.9506 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )

    return [
        createFeatureItem("title_1", "des_1", svg1),
        createFeatureItem("title_2", "des_2", svg2),
        createFeatureItem("title_3", "des_3", svg3),
        createFeatureItem("title_4", "des_4", svg4),
        createFeatureItem("title_5", "des_5", svg5),
        createFeatureItem("title_6", "des_6", svg6),
    ]
}


export const features_app = (t) => {
    return [t("features_1"), t("features_2"), t("features_3")]
}

export const pricing_items = (t) => {
    return [
        {
            priceID: {
                monthly: 11111,
                yearly: 22222,
            },
            title: t("free_title"),
            price: {
                monthly: "0",
                yearly: "0",
            },
            description: t("free_des"),
            features: [
                t("free_feature_1"),
                t("free_feature_2"),
                t("free_feature_3"),
                t("free_feature_4"),
                t("free_feature_5"),
            ],
            btn: t("free_btn"),
        },
        {
            priceID: {
                // monthly: "pri_01j5n7c4fbg8qg4pg8gjkvxxb1",
                // yearly: "pri_01j5n7fc116m1t0z8hpm50xg1m"
                monthly: "price_1Q3pEzFjFWeno6z4SH0b0MTK",
                yearly: "price_1Q41V9FjFWeno6z4UxcVUY2M",
            },
            classicalProduct: {
                monthly: 834565,
                yearly: 834566,
            },
            sandboxPriceID: {
                // monthly: "pri_01j5n7wv30k27yn4gz489vv4a5",
                // yearly: "pri_01j64epwmv74hnaqhjnz4mxv0p"
                monthly: "price_1Q409nDHKyVmYzSHYJUbLsvQ",
                yearly: "price_1Q40MtDHKyVmYzSHqwJl5AhM",
            },
            title: t("starter_title"),
            registerType: 1,
            price: {
                monthly: "4.9",
                yearly: "29",
            },
            description: t("starter_des"),
            features: [
                t("starter_feature_1"),
                t("starter_feature_2"),
                t("starter_feature_3"),
                t("starter_feature_4"),
                t("starter_feature_5"),
                t("starter_feature_6"),
                t("starter_feature_7"),
                t("starter_feature_8"),
            ],
            btn: t("starter_btn"),
        },
        {
            priceID: {
                monthly: "price_1Q41KpFjFWeno6z4HywEANIh",
                yearly: "price_1Q41VqFjFWeno6z4mgqvfExH",
            },
            classicalProduct: {
                monthly: 702523,
                yearly: 702526,
            },
            sandboxPriceID: {
                // monthly: "pri_01j64m51a0f6zcbht3g0yjy9x2",
                // yearly: "pri_01j64m246ta96ww897k2p1qgfj"
                monthly: "price_1Q40NSDHKyVmYzSHQn6gt6iR",
                yearly: "price_1Q40OHDHKyVmYzSHBcB7rKj0",
            },
            title: t("premium_title"),
            registerType: 2,

            price: {
                monthly: "9.9",
                yearly: "49",
            },
            description: t("premium_des"),
            features: [
                t("premium_feature_1"),
                t("premium_feature_2"),
                t("premium_feature_3"),
                t("premium_feature_4"),
                t("premium_feature_5"),
                t("premium_feature_6"),
                t("premium_feature_7"),
                t("premium_feature_8"),
            ],
            btn: t("premium_btn"),
        },
        {
            priceID: {
                monthly: "price_1Q41MBFjFWeno6z4f6i1EStU",
                yearly: "price_1Q41WVFjFWeno6z4gprTuVz9",
            },
            classicalProduct: {
                monthly: 702528,
                yearly: 702531,
            },
            sandboxPriceID: {
                // monthly:   "pri_01j64m5h492swpmewxq4jwmakt",
                // yearly: "pri_01j64m3tdcyxprhgzkhdw56qcz"
                monthly: "price_1Q40OlDHKyVmYzSHaLh2f9G1",
                yearly: "price_1Q40P2DHKyVmYzSH0mL4LTRu",
            },
            title: t("business_title"),
            registerType: 3,

            price: {
                monthly: "19",
                yearly: "69",
            },
            description: t("business_des"),
            features: [
                t("business_feature_1"),
                t("business_feature_2"),
                t("business_feature_3"),
                t("business_feature_4"),
                t("business_feature_5"),
                t("business_feature_6"),
                t("business_feature_7"),
                t("business_feature_8"),
            ],
            btn: t("business_btn"),
        },
    ]
}
