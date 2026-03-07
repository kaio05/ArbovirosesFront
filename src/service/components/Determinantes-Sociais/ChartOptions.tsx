import { ApexOptions } from "apexcharts";

export function ChartOptions(categories: string[]): ApexOptions {
    return {
        colors: ["#465fff"],
        chart: {
        fontFamily: "Outfit, sans-serif",
        type: "bar",
        height: 180,
        toolbar: {
            show: false,
        },
        },
        plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "39%",
            borderRadius: 5,
            borderRadiusApplication: "end",
        },
        },
        dataLabels: {
        enabled: false,
        },
        stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
        },
        xaxis: {
        categories: [...categories, "Não informado", "Total"],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        },
        legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Outfit",
        },
        yaxis: {
        title: {
            text: "Quantidade de residências",
        },
        },
        grid: {
        yaxis: {
            lines: {
            show: true,
            },
        },
        },
        fill: {
        opacity: 1,
        },

        tooltip: {
        x: {
            show: false,
        },
        y: {
            formatter: (val: number) => `${val}`,
        },
        },
    }
}