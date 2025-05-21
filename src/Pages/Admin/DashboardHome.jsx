

// src/pages/DashboardHome.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Table, Badge, ProgressBar, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { FaBox, FaList, FaShoppingCart, FaClock, FaChartLine, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Color scheme
const colors = {
  primary: '#6366f1',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6'
};

const customStyles = {
    fontFamily: "'Poppins', sans-serif",
    chartGradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.info} 100%)`,
    headerBorder: `2px solid ${colors.primary}20`,
    tableHeaderBg: '#f8f9fa'
  };
export default function DashboardHome({token}) {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [productsStock, setProductsStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const Api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
    
  
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          axios.get(`${Api_url}/apiv1/dashboard/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${Api_url}/apiv1/dashboard/order?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${Api_url}/apiv1/dashboard/stock?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data);
        setProductsStock(productsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const statusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'processed': return 'primary';
      case 'completed': return 'success';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-home px-3 py-4"
      style={{ fontFamily: customStyles.fontFamily }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ borderBottom: customStyles.headerBorder, paddingBottom: '1rem' }}>
        <h2 className="mb-0 text-dark fw-bold" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
          <FaChartLine className="me-2" style={{ color: colors.primary, fontSize: '1.5em' }} />
          Dashboard Overview
        </h2>
        <div className="d-flex gap-2">
          <Badge bg="light" className="text-dark" style={{ fontWeight: 500, letterSpacing: '0.5px' }}>
            <FaRegClock className="me-1" /> Live Updates
          </Badge>
        </div>
      </div>
  
      {/* Key Metrics Row */}
      <Row className="g-4 mb-4">
        { [
           { icon: <FaList />, title: 'Total Categories', value: stats.totalCategories, color: colors.primary },
          { icon: <FaBox />, title: 'Total Products', value: stats.totalProducts, color: colors.success },
          { icon: <FaShoppingCart />, title: 'Total Orders', value: stats.totalOrders, color: colors.info },
          { icon: <FaClock />, title: 'Pending Orders', value: stats.pendingOrders, color: colors.warning }
        ].map((metric, idx) => (
          <Col xl={3} md={6} key={idx}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="h-100 border-0 shadow-lg" style={{ 
                background: `linear-gradient(145deg, ${metric.color}10 0%, #ffffff 100%)`,
                border: `1px solid ${metric.color}20`
              }}>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded p-3 me-3 shadow-sm"
                      style={{ 
                        background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}80 100%)`,
                        width: '60px',
                        height: '60px',
                        border: `2px solid ${metric.color}30`
                      }}
                    >
                      <div className="text-white fs-4">{metric.icon}</div>
                    </div>
                    <div>
                      <div className="text-muted small mb-1" style={{ fontWeight: 500 }}>{metric.title}</div>
                      <h2 className="mb-0 fw-bold" style={{ 
                        color: metric.color,
                        fontSize: '2.2rem',
                        textShadow: `0 2px 4px ${metric.color}20`
                      }}>
                        {metric.value || 0}
                      </h2>
                    </div>
                  </div>
                  {metric.title === 'Pending Orders' && (
                    <ProgressBar 
                      now={(stats.pendingOrders / stats.totalOrders) * 100} 
                      variant="warning" 
                      className="mt-3"
                      style={{ height: '4px' }}
                    />
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
  
      {/* Charts Row */}
      <Row className="g-4 mb-4">
        <Col xl={8}>
          <motion.div whileHover={{ scale: 1.005 }}>
            <Card className="h-100 border-0 shadow" style={{ border: `1px solid ${colors.primary}20` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2" 
                  style={{ borderBottom: `2px solid ${colors.primary}10` }}>
                  <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '1.25rem' }}>Order Trends</h5>
                  <Badge bg="light" className="text-muted" style={{ 
                    background: `${colors.primary}10 !important`,
                    color: `${colors.primary} !important`,
                    fontWeight: 500
                  }}>
                    Last 6 months
                  </Badge>
                </div>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.monthlyOrders}>
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6b7280', fontFamily: customStyles.fontFamily }}
                        axisLine={{ stroke: colors.primary }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontFamily: customStyles.fontFamily }}
                        axisLine={{ stroke: colors.primary }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#ffffff',
                          border: `1px solid ${colors.primary}20`,
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          fontFamily: customStyles.fontFamily
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke={customStyles.chartGradient}
                        strokeWidth={3}
                        dot={{ fill: colors.primary, strokeWidth: 2 }}
                        animationDuration={500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
  
        {/* Order Status Chart */}
        <Col xl={4}>
          <motion.div whileHover={{ scale: 1.005 }}>
            <Card className="h-100 border-0 shadow" style={{ border: `1px solid ${colors.primary}20` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2" 
                  style={{ borderBottom: `2px solid ${colors.primary}10` }}>
                  <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '1.25rem' }}>Order Status</h5>
                  <Badge bg="light" className="text-muted" style={{ 
                    background: `${colors.primary}10 !important`,
                    color: `${colors.primary} !important`,
                    fontWeight: 500
                  }}>
                    Current
                  </Badge>
                </div>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.orderStatusData}>
                      <XAxis 
                        dataKey="status" 
                        tick={{ fill: '#6b7280', fontFamily: customStyles.fontFamily }}
                        axisLine={{ stroke: colors.primary }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontFamily: customStyles.fontFamily }}
                        axisLine={{ stroke: colors.primary }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#ffffff',
                          border: `1px solid ${colors.primary}20`,
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          fontFamily: customStyles.fontFamily
                        }}
                      />
                      <Bar dataKey="count" animationDuration={500} radius={[4, 4, 0, 0]}>
                        {stats.orderStatusData?.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={colors[statusVariant(entry.status)]}
                            style={{ transition: 'all 0.3s ease' }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
  
      {/* Recent Orders & Stock Levels */}
      <Row className="g-4">
        <Col xl={6}>
          <motion.div whileHover={{ scale: 1.005 }}>
            <Card className="h-100 border-0 shadow" style={{ border: `1px solid ${colors.primary}20` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2" 
                  style={{ borderBottom: `2px solid ${colors.primary}10` }}>
                  <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '1.25rem' }}>
                    <FaShoppingCart className="me-2" style={{ color: colors.primary }} />Recent Orders
                  </h5>
                  <Badge bg="primary" pill style={{ 
                    background: `${colors.primary}20 !important`,
                    color: `${colors.primary} !important`,
                    fontWeight: 600
                  }}>
                    {recentOrders.length}
                  </Badge>
                </div>
                <Table hover className="mb-0">
                  <thead className="bg-light" style={{ background: `${colors.primary}08 !important` }}>
                    <tr>
                      {['Order ID', 'Customer', 'Status'].map((th, idx) => (
                        <th 
                          key={idx} 
                          className="border-0" 
                          style={{ 
                            fontWeight: 600,
                            color: colors.primary,
                            textTransform: 'uppercase',
                            fontSize: '0.8rem'
                          }}
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                      {recentOrders.map((order, index) => (
                        <motion.tr 
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="fw-bold">#{order.id}</td>
                          <td>{order.name}</td>
                          <td>
                            <Badge 
                              pill 
                              className="d-inline-flex align-items-center"
                              style={{ 
                                background: colors[statusVariant(order.orderStatus)] + '20',
                                // color: colors[statusVariant(order.orderStatus)]
                              }}
                            >
                              {order.orderStatus}
                            </Badge>
                          </td>
                          {/* <td className="text-end fw-bold">
                            €{order.hire_price || order.amount}
                          </td> */}
                        </motion.tr>
                      ))}
                    </tbody>
                </Table>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
  
        {/* Stock Levels */}
        <Col xl={6}>
          <motion.div whileHover={{ scale: 1.005 }}>
            <Card className="h-100 border-0 shadow" style={{ border: `1px solid ${colors.primary}20` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2" 
                  style={{ borderBottom: `2px solid ${colors.primary}10` }}>
                  <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '1.25rem' }}>
                    <FaBox className="me-2" style={{ color: colors.primary }} />Stock Alert
                  </h5>
                  <Badge bg="danger" pill style={{ 
                    background: `${colors.danger}20 !important`,
                    color: `${colors.danger} !important`,
                    fontWeight: 600
                  }}>
                    {productsStock.length}
                  </Badge>
                </div> <div className="list-group list-group-flush">
                 {productsStock.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="list-group-item border-0 px-0 py-3 d-flex align-items-center"
                      >
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="fw-bold">{product.name}</span>
                            <span className="text-muted small">{product.Category}</span>
                          </div>
                          <ProgressBar 
                            now={(product.quntity / 20) * 100} 
                            variant={product.quntity > 10 ? 'success' : 'danger'}
                            style={{ height: '6px' }}
                          />
                        </div>
                        <Badge 
                          pill 
                          bg={product.quntity > 10 ? 'success-light' : 'danger-light'} 
                          className="ms-3 fw-bold"
                          style={{
                            background: product.quntity > 10 ? '#dcfce7' : '#fee2e2',
                            color: product.quntity > 10 ? colors.success : colors.danger
                          }}
                        >
                          {product.quntity}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}



// Add this at the top of your file

  
  // Add this to your HTML head or main CSS file
  // <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
