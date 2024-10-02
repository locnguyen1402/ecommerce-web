export interface ThemeOption {
  general: {
    site_title: string;
    site_tagline: string;
    cart_style: string;
    back_to_top_enable: boolean;
    language_direction: string;
    primary_color: string;
    mode: string;
  };
  logo: {
    header_logo_id: number;
    footer_logo_id: number;
    favicon_icon_id: number;
    favicon_icon: Image;
    header_logo: Image;
    footer_logo: Image;
  };
  header: {
    sticky_header_enable: boolean;
    header_options: string;
    page_top_bar_enable: boolean;
    top_bar_content: Array<{ content: string }>;
    page_top_bar_dark: boolean;
    support_number: string;
    today_deals: number[];
    category_ids: number[];
  };
  footer: {
    footer_style: string;
    footer_copyright: boolean;
    copyright_content: string;
    footer_about: string;
    about_address: string;
    about_email: string;
    footer_categories: number[];
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
    collection_layout: string;
    collection_banner_image_url: string;
  };
  product: {
    product_layout: string;
    is_trending_product: boolean;
    banner_enable: boolean;
    banner_image_url: string;
    safe_checkout: boolean;
    safe_checkout_image: string;
    secure_checkout: boolean;
    secure_checkout_image: string;
    encourage_order: boolean;
    encourage_max_order_count: number;
    encourage_view: boolean;
    encourage_max_view_count: number;
    sticky_checkout: boolean;
    sticky_product: boolean;
    social_share: boolean;
    shipping_and_return: string;
  };
  blog: {
    blog_style: string;
    blog_sidebar_type: string;
    blog_author_enable: boolean;
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
    store_layout: string;
    store_details: string;
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
    og_image: Image;
  };
}

interface Image {
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
