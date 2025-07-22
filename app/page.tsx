"use client"


import { useState } from "react"
import { Heart, Activity, Moon, Zap, TrendingUp, BarChart3 } from "lucide-react"
import "bootstrap/dist/css/bootstrap.min.css"

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export default function FitnessDashboard() {
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [weightSleepRange, setWeightSleepRange] = useState("7days")
  const [chartType, setChartType] = useState("both")
  const [selectedWeek, setSelectedWeek] = useState("week1")

  // Mock data for charts
  const weightSleepData = {
    "7days": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weight: [72.5, 72.3, 72.1, 72.4, 72.2, 72.0, 71.8],
      sleep: [7.5, 8.2, 6.8, 7.9, 8.1, 7.3, 8.5],
    },
    "30days": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      weight: [72.8, 72.4, 72.1, 71.9],
      sleep: [7.8, 7.5, 7.9, 8.1],
    },
    "3months": {
      labels: ["Month 1", "Month 2", "Month 3"],
      weight: [73.5, 72.8, 71.9],
      sleep: [7.6, 7.8, 8.0],
    },
  }

  const trainingData = {
    week1: {
      labels: ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"],
      data: [120, 150, 180, 90, 100, 60],
    },
    week2: {
      labels: ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"],
      data: [135, 140, 200, 85, 110, 75],
    },
    week3: {
      labels: ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"],
      data: [110, 160, 170, 95, 95, 80],
    },
  }

  const getLineChartData = () => {
    const currentData = weightSleepData[weightSleepRange as keyof typeof weightSleepData]
    const datasets = []

    if (chartType === "weight" || chartType === "both") {
      datasets.push({
        label: language === "en" ? "Weight (kg)" : "Poids (kg)",
        data: currentData.weight,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      })
    }

    if (chartType === "sleep" || chartType === "both") {
      datasets.push({
        label: language === "en" ? "Sleep (hours)" : "Sommeil (heures)",
        data: currentData.sleep,
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: chartType === "both" ? "y1" : "y",
      })
    }

    return {
      labels: currentData.labels,
      datasets,
    }
  }

  const getBarChartData = () => {
    const currentData = trainingData[selectedWeek as keyof typeof trainingData]
    return {
      labels: currentData.labels,
      datasets: [
        {
          label: language === "en" ? "Training Volume (minutes)" : "Volume d'entraînement (minutes)",
          data: currentData.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 205, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    }
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: chartType === "weight" || chartType === "both",
        position: "left" as const,
        title: {
          display: true,
          text: language === "en" ? "Weight (kg)" : "Poids (kg)",
        },
      },
      y1: {
        type: "linear" as const,
        display: chartType === "both",
        position: "right" as const,
        title: {
          display: true,
          text: language === "en" ? "Sleep (hours)" : "Sommeil (heures)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: language === "en" ? "Minutes" : "Minutes",
        },
      },
    },
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header className="dashboard-header-bg py-4 mb-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="fw-bold mb-2">
                <Activity className="me-2" size={32} />
                <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>
                  Fitness Dashboard
                </span>
                <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>
                  Tableau de bord de remise en forme
                </span>
              </h1>
              <p className="mb-0 opacity-75">
                <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>
                  Track your health and fitness progress with comprehensive analytics
                </span>
                <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>
                  Suivez vos progrès de santé et de forme physique avec des analyses complètes
                </span>
              </p>
            </div>
            <div className="col-md-4 text-end">
              <div className="language-switcher">
                <button
                  className={`btn ${language === "en" ? "btn-light" : "btn-outline-light"} me-2 language-switcher-btn`}
                  onClick={() => setLanguage("en")}
                >
                  <span className="me-1 bi bi-flag"></span> EN
                </button>
                <button
                  className={`btn ${language === "fr" ? "btn-light" : "btn-outline-light"} language-switcher-btn`}
                  onClick={() => setLanguage("fr")}
                >
                  <span className="me-1 bi bi-flag-fill"></span> FR
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Subtitle and mini sub-title */}
      <div className="container-fluid">
        <h2 className="fw-bold mb-3 text-center">
          <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Today's Metrics</span>
          <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Métriques du jour</span>
        </h2>
        <div className="text-secondary text-center" style={{ fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
          <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>
            (All data shown is AI generated and for demonstration purposes only.)
          </span>
          <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>
            (Toutes les données affichées sont générées par l'IA et à des fins de démonstration uniquement.)
          </span>
        </div>
      </div>

      <main className="container-fluid">
        {/* Quick Stats Row */}
        <div className="row mb-4 dashboard-row-gutter">
          <div className="col-md-3">
            <div className="card dashboard-metric-card dashboard-metric-card-border border-0 shadow-sm dashboard-card-fullheight">
              <div className="card-body text-center">
                <Heart className="text-danger" size={40} />
                <h4 className="fw-bold text-dark">72 BPM</h4>
                <p className="text-muted mb-0">
                  <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Avg Heart Rate</span>
                  <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Fréq. cardiaque moy.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card dashboard-metric-card dashboard-metric-card-border border-0 shadow-sm dashboard-card-fullheight">
              <div className="card-body text-center">
                <Activity className="text-primary" size={40} />
                <h4 className="fw-bold text-dark">8,547</h4>
                <p className="text-muted mb-0">
                  <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Daily Steps</span>
                  <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Pas quotidiens</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card dashboard-metric-card dashboard-metric-card-border border-0 shadow-sm dashboard-card-fullheight">
              <div className="card-body text-center">
                <Moon className="text-info" size={40} />
                <h4 className="fw-bold text-dark">7.2h</h4>
                <p className="text-muted mb-0">
                  <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Sleep Duration</span>
                  <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Durée de sommeil</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card dashboard-metric-card dashboard-metric-card-border border-0 shadow-sm dashboard-card-fullheight">
              <div className="card-body text-center">
                <Zap className="text-warning" size={40} />
                <h4 className="fw-bold text-dark">2,340</h4>
                <p className="text-muted mb-0">
                  <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Calories Burned</span>
                  <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Calories brûlées</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row dashboard-row-gutter align-items-stretch" style={{ minHeight: 0 }}>
          {/* Weight & Sleep Trend Chart */}
          <div className="col-lg-8 mb-4 dashboard-col-weight-sleep h-100">
            <div className="card border-0 shadow-sm dashboard-card-fullheight dashboard-card-gradient-bg">
              <div className="dashboard-card-gradient-inner">
                <div className="card-header bg-white border-0 pb-0">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5 className="fw-bold text-dark mb-1">
                        <TrendingUp className="text-success me-2" size={20} />
                        <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Weight & Sleep Trends</span>
                        <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Tendances Poids & Sommeil</span>
                      </h5>
                      <p className="text-muted mb-0">
                        <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Track your daily weight and sleep patterns over time to identify correlations and trends</span>
                        <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Suivez votre poids quotidien et vos habitudes de sommeil pour identifier les corrélations et tendances</span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="chart-controls p-2 dashboard-chart-controls">
                        {/* Dropdown for time range */}
                        <select className="form-select form-select-sm mb-2" value={weightSleepRange} onChange={e => setWeightSleepRange(e.target.value)}>
                          <option value="7days">{language === "en" ? "Last 7 Days" : "7 derniers jours"}</option>
                          <option value="30days">{language === "en" ? "Last 30 Days" : "30 derniers jours"}</option>
                          <option value="3months">{language === "en" ? "Last 3 Months" : "3 derniers mois"}</option>
                        </select>
                        {/* Radio buttons for metric selection */}
                        <div className="btn-group btn-group-sm w-100" role="group">
                          <input type="radio" className="btn-check" name="weightMetric" id="weight" checked={chartType === "weight"} onChange={() => setChartType("weight")}/>
                          <label className="btn btn-outline-primary" htmlFor="weight">
                            <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Weight</span>
                            <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Poids</span>
                          </label>
                          <input type="radio" className="btn-check" name="weightMetric" id="sleep" checked={chartType === "sleep"} onChange={() => setChartType("sleep")}/>
                          <label className="btn btn-outline-primary" htmlFor="sleep">
                            <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Sleep</span>
                            <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Sommeil</span>
                          </label>
                          <input type="radio" className="btn-check" name="weightMetric" id="both" checked={chartType === "both"} onChange={() => setChartType("both")}/>
                          <label className="btn btn-outline-primary" htmlFor="both">
                            <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Both</span>
                            <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Les deux</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body dashboard-card-body-centered">
                  <div style={{ height: "300px", width: "100%" }}>
                    {/* Chart.js Line Chart */}
                    <Line data={getLineChartData()} options={lineChartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Training Volume Chart */}
          <div className="col-lg-4 mb-4 dashboard-col-training-volume h-100">
            <div className="card border-0 shadow-sm dashboard-card-fullheight dashboard-card-gradient-bg">
              <div className="dashboard-card-gradient-inner">
                <div className="card-header bg-white border-0 pb-0">
                  <h5 className="fw-bold text-dark mb-1">
                    <BarChart3 className="text-primary me-2" size={20} />
                    <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Weekly Training Volume</span>
                    <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Volume d'entraînement hebdomadaire</span>
                  </h5>
                  <p className="text-muted mb-0">
                    <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Training volume breakdown by muscle group for optimal workout planning</span>
                    <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Répartition du volume d'entraînement par groupe musculaire pour une planification optimale</span>
                  </p>
                </div>
                <div className="card-body dashboard-card-body-centered">
                  <div className="chart-controls p-2 mb-3 dashboard-chart-controls">
                    {/* Dropdown for week selection */}
                    <select className="form-select form-select-sm" value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}>
                      <option value="week1">{language === "en" ? "This Week" : "Cette semaine"}</option>
                      <option value="week2">{language === "en" ? "Last Week" : "Semaine dernière"}</option>
                      <option value="week3">{language === "en" ? "Last 4 Weeks" : "4 dernières semaines"}</option>
                    </select>
                  </div>
                  <div style={{ height: "300px", width: "100%" }}>
                    {/* Chart.js Bar Chart */}
                    <Bar data={getBarChartData()} options={barChartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 mt-5 border-top dashboard-footer-bg">
        <p className="text-white mb-0">
          <span lang="en" style={{ display: language === "en" ? "inline" : "none" }}>Fitness Dashboard © 2025 - Track your progress, achieve your goals</span>
          <span lang="fr" style={{ display: language === "fr" ? "inline" : "none" }}>Tableau de bord Fitness © 2025 - Suivez vos progrès, atteignez vos objectifs</span>
        </p>
      </footer>
    </div>
  )
}
