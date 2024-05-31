/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { KTIcon } from '../../../../helpers';
import { getCSS, getCSSVariableValue } from '../../../../assets/ts/_utils';
import { useThemeMode } from '../../../layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
  chartSize?: number;
  chartLine?: number;
  chartRotate?: number;
};

const CardsWidget6: FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, 'height'));

    const chart = new ApexCharts(chartRef.current, getChartOptions(height));
    if (chart) {
      chart.render();
    }

    return chart;
  };

  return (
    <div className={`card card-flush ${className}`}>
      {/* begin::Header */}
      <div className="card-header pt-5">
        {/* begin::Title */}
        <div className="card-title d-flex flex-column">
          {/* begin::Info */}
          <div className="d-flex align-items-center">
            {/* begin::Currency */}
            <span className="fs-4 fw-semibold text-gray-500 me-1 align-self-start">đ</span>
            {/* end::Currency */}
            {/* begin::Amount */}
            <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">2.500.000</span>
            {/* end::Amount */}
            {/* begin::Badge */}
            <span className="badge badge-light-success fs-base">
              <i className="ki-duotone ki-arrow-up fs-5 text-success ms-n1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              2.6%
            </span>
            {/* end::Badge */}
          </div>
          {/* end::Info */}
          {/* begin::Subtitle */}
          <span className="text-gray-500 pt-1 fw-semibold fs-6">Average Daily Sales</span>
          {/* end::Subtitle */}
        </div>
        {/* end::Title */}
      </div>
      {/* end::Header */}

      {/* begin::Card body */}
      <div className="card-body d-flex align-items-end px-0 pb-0">
        {/* begin::Chart */}
        <div
          ref={chartRef}
          id="kt_card_widget_6_chart"
          className="w-100"
          style={{
            height: '80px',
          }}
          // style="height: 80px"
        ></div>
        {/* end::Chart */}
      </div>
      {/* end::Card body */}
    </div>
  );
};

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');

  return {
    series: [
      {
        name: 'Sales',
        data: [30, 60, 53, 45, 60, 75, 53],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 9,
      colors: ['transparent'],
    },
    xaxis: {
      tickPlacement: 'between',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      x: {
        formatter: function (val) {
          return 'Feb: ' + val;
        },
      },
      y: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      padding: {
        left: 10,
        right: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}

export { CardsWidget6 };
