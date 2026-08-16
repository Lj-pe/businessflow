import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import './Dashboard.css';

const salesData = [
  { day: 'Lun', sales: 3200 },
  { day: 'Mar', sales: 4100 },
  { day: 'Mié', sales: 3800 },
  { day: 'Jue', sales: 5200 },
  { day: 'Vie', sales: 6100 },
  { day: 'Sáb', sales: 7400 },
  { day: 'Dom', sales: 6800 },
];

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem('businessflow_user')
  );

  const userName = user?.name || 'Usuario';

  return (
    <main className="dashboard">

      <header className="dashboard-header">

        <div className="dashboard-brand">

          <div className="dashboard-brand-mark">
            BF
          </div>

          <span>BusinessFlow</span>

        </div>

        <div className="header-right">

          <button className="notification">
            <Bell size={17} />
          </button>

          <div className="user-profile">

            <div className="user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">

              <strong>{userName}</strong>

              <span>
                {user?.role_id === 1
                  ? 'Administrador'
                  : 'Usuario'}
              </span>

            </div>

            <ChevronDown size={14} />

          </div>

        </div>

      </header>

      <div className="dashboard-layout">

        <aside className="sidebar">

          <div className="sidebar-label">
            Principal
          </div>

          <nav className="sidebar-menu">

            <button className="sidebar-item active">
              <LayoutDashboard size={16} />
              Dashboard
            </button>

            <button className="sidebar-item">
              <ShoppingCart size={16} />
              Ventas
            </button>

            <button className="sidebar-item">
              <Package size={16} />
              Productos
            </button>

            <button className="sidebar-item">
              <Tags size={16} />
              Categorías
            </button>

            <button className="sidebar-item">
              <Users size={16} />
              Usuarios
            </button>

          </nav>

          <div
            className="sidebar-label"
            style={{ marginTop: '30px' }}
          >
            Gestión
          </div>

          <nav className="sidebar-menu">

            <button className="sidebar-item">
              <Wallet size={16} />
              Finanzas
            </button>

            <button className="sidebar-item">
              <TrendingUp size={16} />
              Reportes
            </button>

          </nav>

        </aside>

        <section className="dashboard-content">

          <div className="dashboard-heading">

            <div>
              <h1>
                Buenos días, {userName.split(' ')[0]}.
              </h1>

              <p>
                Aquí tienes una visión general de tu negocio.
              </p>
            </div>

            <select className="period-selector">
              <option>
                Últimos 7 días
              </option>

              <option>
                Últimos 30 días
              </option>

              <option>
                Este año
              </option>
            </select>

          </div>

          <section className="stats-grid">

            <article className="stat-card">

              <div className="stat-top">

                <div className="stat-icon">
                  <Wallet size={18} />
                </div>

                <div className="stat-change">
                  ↑ 18.4%
                </div>

              </div>

              <span>
                Ingresos
              </span>

              <strong>
                S/ 42,850
              </strong>

            </article>

            <article className="stat-card">

              <div className="stat-top">

                <div className="stat-icon">
                  <ShoppingCart size={18} />
                </div>

                <div className="stat-change">
                  ↑ 12.8%
                </div>

              </div>

              <span>
                Ventas
              </span>

              <strong>
                1,284
              </strong>

            </article>

            <article className="stat-card">

              <div className="stat-top">

                <div className="stat-icon">
                  <Package size={18} />
                </div>

                <div className="stat-change">
                  ↑ 4.2%
                </div>

              </div>

              <span>
                Inventario
              </span>

              <strong>
                86.4%
              </strong>

            </article>

            <article className="stat-card">

              <div className="stat-top">

                <div className="stat-icon">
                  <Users size={18} />
                </div>

                <div className="stat-change">
                  ↑ 8.7%
                </div>

              </div>

              <span>
                Usuarios
              </span>

              <strong>
                342
              </strong>

            </article>

          </section>

          <section className="analytics-grid">

            <div className="panel">

              <div className="panel-header">

                <h3>
                  Rendimiento de ventas
                </h3>

                <span>
                  Esta semana
                </span>

              </div>

              <div className="chart-container">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={salesData}
                  >

                    <defs>

                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="100%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      stroke="#555560"
                      tickLine={false}
                      axisLine={false}
                      fontSize={10}
                    />

                    <YAxis
                      stroke="#555560"
                      tickLine={false}
                      axisLine={false}
                      fontSize={10}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#salesGradient)"
                    />

                  </AreaChart>
                </ResponsiveContainer>

              </div>

            </div>

            <div className="panel">

              <div className="panel-header">

                <h3>
                  Actividad reciente
                </h3>

                <span>
                  Ver todo
                </span>

              </div>

              <div className="activity-list">

                <div className="activity">

                  <div className="activity-icon">
                    <ShoppingCart size={15} />
                  </div>

                  <div className="activity-content">

                    <strong>
                      Nueva venta
                    </strong>

                    <span>
                      Hace 8 minutos
                    </span>

                  </div>

                  <div className="activity-value">
                    + S/ 450
                  </div>

                </div>

                <div className="activity">

                  <div className="activity-icon">
                    <Package size={15} />
                  </div>

                  <div className="activity-content">

                    <strong>
                      Producto agregado
                    </strong>

                    <span>
                      Hace 32 minutos
                    </span>

                  </div>

                </div>

                <div className="activity">

                  <div className="activity-icon">
                    <Users size={15} />
                  </div>

                  <div className="activity-content">

                    <strong>
                      Nuevo usuario
                    </strong>

                    <span>
                      Hace 1 hora
                    </span>

                  </div>

                </div>

                <div className="activity">

                  <div className="activity-icon">
                    <TrendingUp size={15} />
                  </div>

                  <div className="activity-content">

                    <strong>
                      Ventas aumentaron
                    </strong>

                    <span>
                      Hoy
                    </span>

                  </div>

                  <div className="activity-value">
                    +18.4%
                  </div>

                </div>

              </div>

            </div>

          </section>

        </section>

      </div>

    </main>
  );
}

export default Dashboard;