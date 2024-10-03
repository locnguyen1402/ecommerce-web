export interface ThemeOption {
  general: {
    site_title: string;
    site_tagline: string;
    cart_style: 'cart_sidebar' | 'mini_cart';
    back_to_top_enable: boolean;
    language_direction: 'ltr' | 'rtl';
    primary_color: string;
    mode: 'light' | 'dark';
  };
  logo: {
    header_logo_id: number;
    footer_logo_id: number;
    favicon_icon_id: number;
    favicon_icon: ThemeImage;
    header_logo: ThemeImage;
    footer_logo: ThemeImage;
  };
  header: {
    sticky_header_enable: boolean;
    header_options: 'basic_header' | 'classic_header' | 'standard_header' | 'minimal_header';
    page_top_bar_enable: boolean;
    /**
     * @example
     * [
     *   {
     *     "content": "<strong class=\"me-1\">Welcome to Fastkart!</strong>Wrap new offers/gift every single day on Weekends.<strong class=\"ms-1\">New Coupon Code: FAST50</strong>"
     *   },
     *   {
     *     "content": "Something you love is now on sale <strong>Buy Now!</strong>"
     *   },
     *   {
     *     "content": "Your must-have item is calling – <strong>Buy Now!</strong>"
     *   }
     * ]
     */
    top_bar_content: { content: string }[];
    page_top_bar_dark: boolean;
    support_number: string;
    today_deals: number[];
    category_ids: number[];
  };
  footer: {
    footer_style: 'light_mode' | 'dark_mode';
    footer_copyright: boolean;
    copyright_content: string;
    footer_about: string;
    about_address: string;
    about_email: string;
    /**
     * @constant available footer categories: "home", "collections", "about-us", "blogs", "offers", "search", "faq"
     */
    footer_categories: number[] | string[];
    help_center: Array<{ label: string; link: string }>;
    useful_link: Array<{ label: string; link: string }>;
    support_number: string;
    support_email: string;
    play_store_url: string;
    app_store_url: string;
    social_media_enable: boolean;
    facebook: string;
    instagram: string;
    twitter: string;
    pinterest: string;
  };
  collection: {
    collection_layout:
      | 'collection_left_sidebar'
      | 'collection_right_sidebar'
      | 'collection_no_sidebar'
      | 'collection_3_grid'
      | 'collection_4_grid'
      | 'collection_5_grid'
      | 'collection_list_view'
      | 'collection_category_slider'
      | 'collection_category_sidebar'
      | 'collection_banner'
      | 'collection_offcanvas_filter';
    /**
     * Used with collection_layout:
     *  - collection_category_slider
     *  - collection_category_sidebar
     *  - collection_offcanvas_filter
     */
    collection_banner_image_url: string;
  };
  product: {
    product_layout:
      | 'product_thumbnail'
      | 'product_images'
      | 'product_slider'
      | 'product_sticky'
      | 'product_accordion';
    /**
     * Enabling this will showcase the product in the sidebar of the product page as a trending item.
     */
    is_trending_product: boolean;
    /**
     * Enabling this will showcase the banner in the sidebar of the product page.
     */
    banner_enable: boolean;
    banner_image_url: string;
    /**
     * A safe checkout image will appear on the product page.
     */
    safe_checkout: boolean;
    /**
     * A secure checkout image will appear on the product page.
     */
    safe_checkout_image: string;
    secure_checkout: boolean;
    secure_checkout_image: string;
    encourage_order: boolean;
    /**
     * A random order count between 1 and 100 will be displayed to motivate user purchases.
     */
    encourage_max_order_count: number;
    /**
     * This feature encourages users to view products by presenting engaging content or prompts.
     */
    encourage_view: boolean;
    /**
     * This feature encourages users to view products by presenting engaging content or prompts.
     */
    encourage_max_view_count: number;
    /**
     * Enable to make the Add to Cart and checkout options sticky at the bottom of the product page.
     */
    sticky_checkout: boolean;
    /**
     * Enable to showcase random products at the bottom of the website.
     */
    sticky_product: boolean;
    /**
     * Enable this option to allow users to share the product on social media platforms.
     */
    social_share: boolean;
    /**
     * Enable to showcase random products at the bottom of the website.
     */
    shipping_and_return: string;
  };
  blog: {
    blog_style: 'grid_view' | 'list_view';
    blog_sidebar_type: 'left_sidebar' | 'right_sidebar' | 'no_sidebar';
    /**
     * Enable this option to show blog author name.
     */
    blog_author_enable: boolean;
    /**
     * Enable this option to show blog box in Read More button.
     */
    read_more_enable: boolean;
  };
  seller: {
    about: {
      status: boolean;
      title: string;
      description: string;
      image_url: string;
    };
    services: {
      status: boolean;
      service_1: Service;
      service_2: Service;
      service_3: Service;
      service_4: Service;
    };
    steps: {
      status: boolean;
      title: string;
      step_1: Step;
      step_2: Step;
      step_3: Step;
    };
    start_selling: {
      status: boolean;
      title: string;
      description: string;
    };
    store_layout: 'basic_store' | 'classic_store';
    store_details: 'basic_store_details' | 'classic_store_details';
  };
  contact_us: {
    contact_image_url: string;
    detail_1: ContactDetail;
    detail_2: ContactDetail;
    detail_3: ContactDetail;
    detail_4: ContactDetail;
  };
  error_page: {
    error_page_content: string;
    back_button_enable: boolean;
    back_button_text: string;
  };
  seo: {
    meta_tags: string;
    meta_title: string;
    meta_description: string;
    og_title: string;
    og_description: string;
    og_image_id: number;
    og_image: ThemeImage;
  };
}

interface ThemeImage {
  id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: string;
  created_by_id: string;
  created_at: string;
  updated_at: string;
  original_url: string;
}

interface Service {
  title: string;
  description: string;
  image_url: string;
}

interface Step {
  title: string;
  description: string;
}

interface ContactDetail {
  label: string;
  icon: string;
  text: string;
}
