import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import UserForm from './pages/UserForm'
import LoginForm from './pages/LoginForm'
import Questions from './pages/Questions'
import QuestionDetails from './pages/QuestionDetails'
import ProtectedRoute from './utils/ProtectedRoute'
import QuestionsList from './pages/QuestionsList'
import AddQuestions from './pages/AddQuestions'
import AdminQuestionView from './pages/AdminQuestionView'
import AdminQuestionEdit from './pages/AdminQuestionEdit'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public routes with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/question/code/:id" element={<QuestionDetails />} />
        </Route>

        {/* Admin protected routes WITH layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/questions" element={<QuestionsList />} />
          <Route path="/admin/add/questions" element={<AddQuestions />} />
          <Route path="/admin/view/:id" element={<AdminQuestionView />} />
          <Route path="/edit/:id" element={<AdminQuestionEdit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App
