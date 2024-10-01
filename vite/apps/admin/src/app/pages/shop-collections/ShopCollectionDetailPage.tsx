import { useState } from 'react';
import { Link, generatePath, useParams } from 'react-router-dom';

import { KTIcon } from '@mila/metronic-core';
import { LabelValueList, LabelValueListDef } from '@mila/components';

import { OkButton, PageLayout } from '@/shared/components';
import { useDetailQuery, useI18n, useQueryHelpers } from '@/hooks';
import { ProductCategoryDetail, ShopCollectionDetail } from '@/api/responses';
import { INVENTORY_API_URLS } from '@/api';
import { APP_ROUTES, QUERY_KEYS } from '@/constants';

import ProductsTable from './components/ProductsTable';
import AddProductsModal from './components/AddProductsModal';
import RemoveProductsModal from './components/RemoveProductsModal';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const queryHelpers = useQueryHelpers();
  const [collectionModalState, setCollectionModalState] = useState<{
    visible: boolean;
    action: 'add-products' | 'remove-products' | null;
  }>({
    visible: false,
    action: null,
  });

  const { data: detail } = useDetailQuery<ShopCollectionDetail>(
    generatePath(INVENTORY_API_URLS.SHOP_COLLECTION_DETAIL, {
      id,
    }),
    {
      queryKey: [QUERY_KEYS.shopCollection.base, QUERY_KEYS.shopCollection.detail, id],
      enabled: !!id,
    }
  );

  const breadCrumbs = [
    {
      title: t('breadcrumbs.productCategoryManagement'),
      path: APP_ROUTES.shopCollections.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<ProductCategoryDetail> = [
    // {
    //   label: 'label.name',
    //   value: 'name',
    // },
    {
      label: 'label.slug',
      value: 'slug',
    },
    {
      label: 'label.parent',
      renderValue: (data) => data.parent?.name,
    },
    {
      label: 'label.description',
      value: 'description',
    },
  ];

  const onAddProducts = () => {
    setCollectionModalState({
      visible: true,
      action: 'add-products',
    });
  };

  const onRemoveProducts = () => {
    setCollectionModalState({
      visible: true,
      action: 'remove-products',
    });
  };

  const onCloseModal = () => {
    setCollectionModalState({
      visible: false,
      action: null,
    });
  };

  const addOrRemoveProductsSuccessCallback = () => {
    queryHelpers.invalidate([
      QUERY_KEYS.shopCollection.base,
      QUERY_KEYS.shopCollection.detail,
      id!,
      QUERY_KEYS.product.base,
      QUERY_KEYS.product.list,
    ]);
  };

  return (
    <>
      <PageLayout
        pageTitle={t('label.detail')}
        breadCrumbs={breadCrumbs}
        action={
          <>
            <OkButton className="btn-sm" onClick={onAddProducts}>
              {t('actions.addProducts')}
            </OkButton>

            <OkButton className="btn-sm" onClick={onRemoveProducts}>
              {t('actions.removeProducts')}
            </OkButton>
          </>
        }
      >
        <div className="card mb-4 mb-lg-8">
          <div className="card-header">
            <div className="card-title">
              <span className="fw-bold text-muted fs-6 me-2">{t('label.name')}:</span>
              <span className="fw-bolder">{detail?.name}</span>
            </div>
            <div className="card-toolbar">
              <Link to="edit" className="btn btn-sm btn-flex fw-bold btn-primary">
                <KTIcon iconName="notepad-edit" className="fs-4 me-1" />
                {t('actions.edit')}
              </Link>
            </div>
          </div>
          <div className="card-body">
            <LabelValueList t={t as any} data={detail} def={itemDefs} />
          </div>
        </div>

        <ProductsTable />

        <AddProductsModal
          isOpen={collectionModalState.visible && collectionModalState?.action === 'add-products'}
          onClose={onCloseModal}
          collection={detail}
          successCallback={addOrRemoveProductsSuccessCallback}
        />
        <RemoveProductsModal
          isOpen={
            collectionModalState.visible && collectionModalState?.action === 'remove-products'
          }
          onClose={onCloseModal}
          collection={detail}
          successCallback={addOrRemoveProductsSuccessCallback}
        />
      </PageLayout>
    </>
  );
};

export default Page;
