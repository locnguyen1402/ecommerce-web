import { useEffect, useRef, FC } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { KTIcon } from '../../../helpers';
import { Dropdown2 } from '../../content/dropdown/Dropdown2';
import { getCSS, getCSSVariableValue } from '../../../assets/ts/_utils';
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget10: FC<Props> = ({ className }) => {
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
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header py-5">
        {/* begin::Title */}
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-gray-900">Discounted Product Sales</span>
          <span className="text-gray-500 mt-1 fw-semibold fs-6">Users from all channels</span>
        </h3>
        {/* end::Title */}
        {/* begin::Toolbar */}
        <div className="card-toolbar">
          {/* begin::Menu */}
          <button
            className="btn btn-icon btn-color-gray-500 btn-active-color-primary justify-content-end"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-overflow="true"
          >
            <KTIcon iconName="dots-square" className="fs-1" />
          </button>
          {/* begin::Menu 2 */}
          <Dropdown2 />
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}
      {/* begin::Card body */}
      <div className="card-body d-flex justify-content-between flex-column pb-1 px-0">
        {/* begin::Info */}
        <div className="px-9 mb-5">
          {/* begin::Statistics */}
          <div className="d-flex align-items-center mb-2">
            {/* begin::Currency */}
            <span className="fs-4 fw-semibold text-gray-500 align-self-start me-1">$</span>
            {/* end::Currency */}
            {/* begin::Value */}
            <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">3,706</span>
            {/* end::Value */}
            {/* begin::Label */}
            <span className="badge badge-light-success fs-base">
              <i className="ki-duotone ki-arrow-up fs-5 text-success ms-n1">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              4.5%
            </span>
            {/* end::Label */}
          </div>
          {/* end::Statistics */}
          {/* begin::Description */}
          <span className="fs-6 fw-semibold text-gray-500">Total Discounted Sales This Month</span>
          {/* end::Description */}
        </div>
        {/* end::Info */}
        {/* begin::Chart */}
        <div
          ref={chartRef}
          id="kt_charts_widget_11"
          className="min-h-auto ps-4 pe-6"
          style={{
            height: '300px',
          }}
          // style="height: 300px"
        ></div>
        {/* end::Chart */}
      </div>
      {/* end::Card body */}
    </div>
  );
};

export { ChartsWidget10 };

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-border-dashed-color');
  const baseColor = getCSSVariableValue('--bs-primary');
  const lightColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');

  return {
    series: [
      {
        name: 'Sales',
        data: [
          34.5, 34.5, 35, 35, 35.5, 35.5, 35, 35, 35.5, 35.5, 35, 35, 34.5, 34.5, 35, 35, 35.5,
          35.5, 35,
        ],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 80, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: [
        '',
        'Apr 02',
        'Apr 03',
        'Apr 04',
        'Apr 05',
        'Apr 06',
        'Apr 07',
        'Apr 08',
        'Apr 09',
        'Apr 10',
        'Apr 11',
        'Apr 12',
        'Apr 13',
        'Apr 14',
        'Apr 17',
        'Apr 18',
        'Apr 19',
        'Apr 21',
        '',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6,
      labels: {
        rotate: 0,
        rotateAlways: true,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      max: 36.3,
      min: 33,
      tickAmount: 6,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
        formatter: function (val) {
          return '$' + parseInt(`${10 * val}`);
        },
      },
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
      y: {
        formatter: function (val) {
          return '$' + parseInt(`${10 * val}`);
        },
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
}
