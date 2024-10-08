import { useMemo } from 'react';
import { Link, generatePath, useParams } from 'react-router-dom';

import { KTCard, KTCardBody, KTIcon } from '@mila/metronic-core';
import { LabelValueList, LabelValueListDef } from '@mila/components';

import { PageLayout, TableToolbar1 } from '@/shared/components';

import { useDetailQuery, useI18n } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { ProductDetail } from '@/api/responses';
import { APP_ROUTES, QUERY_KEYS } from '@/constants';
import { formatCurrency } from '@/i18n';

import { ProductVariantTable } from './components/ProductVariantTable';
import ProductVariantExtendStockButton from './components/ProductVariantExtendStockButton';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail, isLoading } = useDetailQuery<ProductDetail>(
    generatePath(INVENTORY_API_URLS.PRODUCT_DETAIL, {
      id,
    }),
    {
      queryKey: [QUERY_KEYS.product.base, QUERY_KEYS.product.detail, id],
      enabled: !!id,
    }
  );

  const breadCrumbs = [
    {
      title: t('breadcrumbs.productManagement'),
      path: APP_ROUTES.products.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<ProductDetail> = useMemo(() => {
    const hasMultipleVariants = !isLoading && detail?.attributes && !!detail?.attributes.length;
    const defs: LabelValueListDef<ProductDetail> = [
      // {
      //   label: 'label.slug',
      //   value: 'slug',
      // },
      {
        label: 'label.description',
        value: 'description',
      },
    ];

    if (!hasMultipleVariants) {
      const defaultVariant = detail?.variants?.[0];

      if (defaultVariant) {
        defs.push({
          label: 'label.price',
          value: {
            valueGetter: (d) => formatCurrency(defaultVariant.price),
          },
        });
        defs.push({
          label: 'label.stock',
          renderValue: (d) => {
            return (
              <ProductVariantExtendStockButton
                stock={defaultVariant.stock}
                productId={id!}
                productVariantId={defaultVariant.id}
                modalTitle={t('actions.update')}
              />
            );
          },
        });
      }
    }
    return defs;
  }, [detail, isLoading]);

  return (
    <>
      <PageLayout
        pageTitle={t('label.detail')}
        breadCrumbs={breadCrumbs}
        action={
          <>
            <Link to="edit" className="btn btn-sm btn-flex fw-bold btn-primary">
              <KTIcon iconName="notepad-edit" className="fs-4 me-1" />
              {t('actions.edit')}
            </Link>
          </>
        }
      >
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span className="fw-bold text-muted fs-6 me-2">{t('label.name')}:</span>
              <span className="fw-bolder">{detail?.name}</span>
            </div>
          </div>
          <div className="card-body">
            <LabelValueList t={t as any} data={detail} def={itemDefs} />
          </div>
        </div>

        {!!detail?.attributes.length && (
          <KTCard className="mt-6 mt-lg-10">
            <TableToolbar1 left={t('label.variants')} />
            <KTCardBody className="py-4">
              <ProductVariantTable
                variants={detail?.variants || []}
                attributes={detail?.attributes || []}
              />
            </KTCardBody>
          </KTCard>
        )}
      </PageLayout>
    </>
  );
};

export default Page;
