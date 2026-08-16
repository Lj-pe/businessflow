import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from 'lucide-react';

import api from '../services/api';

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem(
        'businessflow_token',
        token
      );

      localStorage.setItem(
        'businessflow_user',
        JSON.stringify(user)
      );

      console.log('Login exitoso:', user);

      navigate('/dashboard');

    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
          'Error al iniciar sesión'
        );
      } else {
        setError(
          'No se pudo conectar con BusinessFlow API'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">

      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>
      <div className="background-grid"></div>

      <section className="login-page">

        <div className="brand-section">

          <div className="brand">

            <div className="brand-mark">
              BF
            </div>

            <span>BusinessFlow</span>

          </div>

          <div className="brand-content">

            <span className="eyebrow">
              BUSINESS MANAGEMENT PLATFORM
            </span>

            <h1>
              Tu negocio.
              <br />
              <span>En movimiento.</span>
            </h1>

            <p>
              Una nueva forma de entender tus ventas,
              controlar tu inventario y tomar decisiones
              que hacen crecer tu negocio.
            </p>

            <div className="metrics">

              <div className="metric">
                <strong>+24%</strong>
                <span>crecimiento</span>
              </div>

              <div className="metric-divider"></div>

              <div className="metric">
                <strong>99.9%</strong>
                <span>disponibilidad</span>
              </div>

              <div className="metric-divider"></div>

              <div className="metric">
                <strong>24/7</strong>
                <span>control</span>
              </div>

            </div>

          </div>

          <div className="brand-footer">
            <span>BUSINESSFLOW</span>

            <span>
              SMARTER BUSINESS · BETTER DECISIONS
            </span>
          </div>

        </div>

        <div className="login-section">

          <div className="login-card">

            <div className="login-header">

              <div className="status">
                <span className="status-dot"></span>
                Sistema operativo
              </div>

              <h2>Bienvenido</h2>

              <p>
                Ingresa a tu espacio de trabajo.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label htmlFor="email">
                  Correo electrónico
                </label>

                <div className="input-wrapper">

                  <Mail size={19} />

                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                </div>

              </div>

              <div className="form-group">

                <div className="password-label">

                  <label htmlFor="password">
                    Contraseña
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>

                </div>

                <div className="input-wrapper">

                  <LockKeyhole size={19} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                <span>
                  {loading
                    ? 'Verificando acceso...'
                    : 'Ingresar a BusinessFlow'}
                </span>

                <span className="button-icon">
                  <ArrowRight size={19} />
                </span>

              </button>

            </form>

            <div className="security-note">

              <LockKeyhole size={15} />

              <span>
                Tus datos están protegidos mediante
                autenticación segura.
              </span>

            </div>

          </div>

          <p className="copyright">
            © 2026 BusinessFlow. Gestión inteligente
            para negocios modernos.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;