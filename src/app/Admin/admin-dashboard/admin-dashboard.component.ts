import { Component, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart, registerables } from 'chart.js';
import { CrimeService } from 'src/app/services/crime.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  gridColumns = 3;

  chart1: any; //crime chart
  chart2: any; //complaint chart
  chart3: any; // user chart

  // count All
  counts: any = {
    crimes: [
      {
        count: 0,
      },
    ],
    rules: [
      {
        count: 0,
      },
    ],
    criminals: [
      {
        count: 0,
      },
    ],
    misseds: [
      {
        count: 0,
      },
    ],
    crimeareas: [
      {
        count: 0,
      },
    ],
    emergencies: [
      {
        count: 0,
      },
    ],
    complaints: [
      {
        count: 0,
      },
    ],
    users: [
      {
        count: 0,
      },
    ],
  };

  // crimes - count by category
  crimes: any = [
    {
      category: '',
      count: '',
    },
  ];

  //  Complaints - count by data
  complaints: any = [
    {
      date: '',
      count: '',
    },
  ];
  //   date -  complaint
  years = [
    {
      year: 2020,
    },

    {
      year: 2021,
    },

    {
      year: 2022,
    },
  ];

  //  month - complaint
  months = [
    {
      id: 1,
      name: 'January',
    },
    {
      id: 2,
      name: 'February',
    },
    {
      id: 3,
      name: 'March',
    },
    {
      id: 4,

      name: 'April',
    },

    {
      id: 5,

      name: 'May',
    },

    {
      id: 6,

      name: 'june',
    },

    {
      id: 7,

      name: 'July',
    },

    {
      id: 8,

      name: 'Augest',
    },

    {
      id: 9,

      name: 'Septhember',
    },

    {
      id: 10,

      name: 'October',
    },

    {
      id: 11,

      name: 'November',
    },

    {
      id: 12,

      name: 'December',
    },
  ];

  selectedYear = 2022;
  selectedMonthId = 1;
  selectedMonthName = 'January';
  entierMonthSum = { month_sum: '' };

  // Users chart data
  users: any = [
    {
      date: '',
      count: '',
    },
  ];
  //   date -  users
  yearsUsr = [
    {
      year: 2020,
    },
    {
      year: 2021,
    },
    {
      year: 2022,
    },
  ];

  //  month - complaint
  monthsUsr = [
    {
      id: 1,
      name: 'January',
    },
    {
      id: 2,
      name: 'February',
    },
    {
      id: 3,
      name: 'March',
    },
    {
      id: 4,
      name: 'April',
    },
    {
      id: 5,
      name: 'May',
    },
    {
      id: 6,
      name: 'june',
    },
    {
      id: 7,
      name: 'July',
    },
    {
      id: 8,
      name: 'Augest',
    },
    {
      id: 9,
      name: 'Septhember',
    },
    {
      id: 10,
      name: 'October',
    },
    {
      id: 11,
      name: 'November',
    },
    {
      id: 12,
      name: 'December',
    },
  ];

  selectedYear_Usr = 2022;
  selectedMonthId_Usr = 1;
  selectedMonthName_Usr = 'January';
  entierMonthSum_Usr = { month_sum: '' };

  constructor(
    private crimeService: CrimeService,
    private DashboardService: DashboardService,
    private ComplaintsService: ComplaintsService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);

    const d = new Date();
    this.selectedYear = d.getFullYear();
    this.selectedYear_Usr = d.getFullYear();
    this.selectedMonthId_Usr = d.getMonth() + 1; // Month [mm] (1 - 12) d.getDate(); // Day [dd] (1 - 31) d.getFullYear(); // Year [yyyy]
    this.selectedMonthId = d.getMonth() + 1;

    this.countAll();
    this.crimesCount();
    this.complaintsCount();
    this.userCount();
  }

  // toggle for columns
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  // count All
  countAll() {
    this.DashboardService.counts().subscribe((data: any) => {
      // console.log(data);
      this.counts = data;
      // console.log('counts ==============================');
      // console.log(this.counts);
      // console.log(this.counts.crimes[0].count);
    });
  }
  // crimes -------------------count crimes
  crimesCount() {
    this.crimeService.crimesCountByCategory().subscribe((data: any) => {
      this.crimes = data;
      // console.log('CRIEMS LIST ==============================');
      // console.log(this.crimes);
      this.loadCrimeChart();
    });
  }

  // get random colors
  getRandomColor() {
    var letters = '0123456789ABCDEF';

    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  // put random color on color list
  getColorList() {
    let colorList: string[] = [];

    for (let i = 0; i < 7; i++) {
      colorList.push(this.getRandomColor());
    }

    return colorList;
  }
  // get crime dataList
  getCrimesDataList() {
    let dataList: number[] = [];

    let initailData = [
      { category: 'Theft', count: 0 },
      { category: 'Murder Attempt', count: 0 },
      { category: 'Criminal Attempt', count: 0 },
      { category: 'Drugs', count: 0 },
      { category: 'Sexual attack', count: 0 },
      { category: 'Violent', count: 0 },
      { category: 'Other', count: 0 },
    ];

    initailData.map((c) => {
      this.crimes.map((n: any) => {
        if (c.category == n.category) {
          c.count = n.count;
        }
      });
    });

    initailData.map((c) => {
      dataList.push(c.count);
    });

    return dataList;
  }

  // load crime charts
  myChart: Chart;
  loadCrimeChart(): void {
    let labelList = [
      'Theft',
      'Murder Attempt',
      'Criminal Attempt',
      'Drugs',
      'Sexual attack',
      'Violent',
      'Other',
    ]; //this.getLabelList(this.selectedYear, this.selectedMonthId);
    let dataList = this.getCrimesDataList();

    if (this.myChart != null) {
      this.myChart.destroy();
    }
    this.chart1 = document.getElementById('chart_canvas_1');
    this.myChart = new Chart(this.chart1, {
      type: 'bar',
      data: {
        labels: labelList,
        datasets: [
          {
            label: 'Crimes count',
            data: dataList,
            backgroundColor: this.getColorList(),
            borderColor: '#007bff',
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //  complaint chart //////////////////////////////////////
  // count complaints
  complaintsCount() {
    this.ComplaintsService.ComplaintsCountByDate(
      this.selectedYear,
      this.selectedMonthId
    ).subscribe((data: any) => {
      this.complaints = data;
      console.log('Complaints LIST ==============================');
      console.log(this.complaints);
      this.loadComplaintChart(this.selectedYear, this.selectedMonthId);
    });
  }
  //2022 - 05 // 1-31
  // get complaints label List
  getComplaintLabelList(year: number, month: number) {
    let daysInMonth = this.daysInMonth(month, year);

    let days = [];

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d + '');
    }

    return days;
  }
  // get complaints dataList
  getComplaintDataList(year: number, month: number) {
    // console.log(this.weightages);

    //const day = this.weightages[0].date.split('-').pop(); // 2020

    let noOfDays = this.daysInMonth(month, year);

    let dataList: number[] = [];

    //Fill dataList with default value 0Kg

    for (let d = 1; d <= noOfDays; d++) {
      dataList.push(0);
    }
    let daysInMonth = this.getComplaintLabelList(year, month);

    daysInMonth.forEach((d, index) => {
      this.complaints.forEach((w: any) => {
        let day = w.date.split('-').pop();
        if (d == day) {
          //Update list with weightages
          dataList.splice(index, 1, parseFloat(w.count));
        }
      });
    });

    return dataList;
  }

  // daysInMonth
  daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  // ////
  // load complaint charts
  myChart2: Chart;
  loadComplaintChart(year: number, month: number): void {
    let labelList = this.getComplaintLabelList(year, month);
    let dataList = this.getComplaintDataList(year, month);

    if (this.myChart2 != null) {
      this.myChart2.destroy();
    }
    this.chart2 = document.getElementById('chart_canvas_2');
    this.myChart2 = new Chart(this.chart2, {
      type: 'line',
      data: {
        labels: labelList,
        datasets: [
          {
            label: 'Complaints count',
            data: dataList,
            backgroundColor: '#E80C0C',
            borderColor: '#E80C0C',
            borderWidth: 3,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //  ComplaintYear
  ComplaintYear() {
    this.complaintsCount();
  }
  //  ComplaintMonth
  ComplaintMonth() {
    this.complaintsCount();
  }

  //  Users chart -------------------------------------
  // count users
  userCount() {
    this.UserService.UsersCountByDate(
      this.selectedYear_Usr,
      this.selectedMonthId_Usr
    ).subscribe((data: any) => {
      this.users = data;
      console.log('user LIST ==============================');
      console.log(this.users);
      this.loadUsersChart(this.selectedYear_Usr, this.selectedMonthId_Usr);
    });
  }
  //2022 - 05 // 1-31
  // get user label List
  getUserLabelList(year: number, month: number) {
    let daysInMonth = this.daysInMonth(month, year);

    let days = [];

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d + '');
    }

    return days;
  }
  // get User dataList
  getUserDataList(year: number, month: number) {
    // console.log(this.weightages);

    //const day = this.weightages[0].date.split('-').pop(); // 2020

    let noOfDays = this.daysInMonth(month, year);

    let dataList: number[] = [];

    //Fill dataList with default value 0Kg

    for (let d = 1; d <= noOfDays; d++) {
      dataList.push(0);
    }
    let daysInMonth = this.getUserLabelList(year, month);

    daysInMonth.forEach((d, index) => {
      this.users.forEach((w: any) => {
        let day = w.date.split('-').pop();
        if (d == day) {
          //Update list with weightages
          dataList.splice(index, 1, parseFloat(w.count));
        }
      });
    });

    return dataList;
  }

  // ////
  // load Users chart
  myChart3: Chart;
  loadUsersChart(year: number, month: number): void {
    let labelList = this.getUserLabelList(year, month);
    let dataList = this.getUserDataList(year, month);

    if (this.myChart3 != null) {
      this.myChart3.destroy();
    }
    this.chart3 = document.getElementById('chart_canvas_3');
    this.myChart3 = new Chart(this.chart3, {
      type: 'line',
      data: {
        labels: labelList,
        datasets: [
          {
            label: 'users count',
            data: dataList,
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            borderWidth: 1,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //  userYear
  userYear() {
    this.userCount();
  }
  //  userMonth
  userMonth() {
    this.userCount();
  }
}
