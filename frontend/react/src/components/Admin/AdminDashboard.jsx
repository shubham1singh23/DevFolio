import { useState, useEffect } from 'react'
import './AdminDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSignOutAlt, faUser, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import AdminEducation from './AdminEducation'
import AdminCertification from './AdminCertification'
import AdminProjects from './AdminProjects'

const API_BASE = 'http://localhost:5000/api' // Change if backend is deployed elsewhere

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Skills state
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState({ name: '', icon: '', category: 'Programming Languages' })
  const [editSkillId, setEditSkillId] = useState(null)
  const [editSkill, setEditSkill] = useState({})

  // About Me state
  const [about, setAbout] = useState(null)
  const [aboutName, setAboutName] = useState('')
  const [aboutDesc, setAboutDesc] = useState('')
  const [aboutImage, setAboutImage] = useState(null)
  const [aboutImagePreview, setAboutImagePreview] = useState('')
  const [aboutPinned, setAboutPinned] = useState([])

  // Active tab state
  const [activeTab, setActiveTab] = useState('about')

  const token = localStorage.getItem('adminToken')
  const authHeader = { headers: { Authorization: `Bearer ${token}` } }

  // Fetch skills
  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`${API_BASE}/skills`).then(res => setSkills(res.data))
    }
  }, [isLoggedIn])

  // Fetch About info
  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`${API_BASE}/about`).then(res => {
        setAbout(res.data)
        if (res.data) {
          setAboutName(res.data.name)
          setAboutDesc(res.data.description)
          setAboutPinned(res.data.pinnedSkills ? res.data.pinnedSkills.map(s => s._id) : [])
          setAboutImagePreview(res.data.profileImage || '')
        }
      })
    }
  }, [isLoggedIn])

  // Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post(`${API_BASE}/admin/login`, { username, password })
      localStorage.setItem('adminToken', res.data.token)
      setIsLoggedIn(true)
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    localStorage.removeItem('adminToken')
  }

  // --- Skill CRUD ---
  const handleSkillChange = e => setNewSkill({ ...newSkill, [e.target.name]: e.target.value })
  const handleAddSkill = async e => {
    e.preventDefault()
    // Split names by comma and add each as a separate skill
    const names = newSkill.name.split(',').map(n => n.trim()).filter(Boolean)
    await Promise.all(names.map(name =>
      axios.post(`${API_BASE}/skills`, { ...newSkill, name }, authHeader)
    ))
    setNewSkill({ name: '', icon: '', category: 'Programming Languages' })
    const res = await axios.get(`${API_BASE}/skills`)
    setSkills(res.data)
  }
  const handleEditSkill = skill => {
    setEditSkillId(skill._id)
    setEditSkill(skill)
  }
  const handleEditSkillChange = e => setEditSkill({ ...editSkill, [e.target.name]: e.target.value })
  const handleUpdateSkill = async e => {
    e.preventDefault()
    await axios.put(`${API_BASE}/skills/${editSkillId}`, editSkill, authHeader)
    setEditSkillId(null)
    setEditSkill({})
    const res = await axios.get(`${API_BASE}/skills`)
    setSkills(res.data)
  }
  const handleDeleteSkill = async id => {
    await axios.delete(`${API_BASE}/skills/${id}`, authHeader)
    setSkills(skills.filter(s => s._id !== id))
  }

  // About Me handlers
  const handleAboutImageChange = e => {
    const file = e.target.files[0]
    setAboutImage(file)
    if (file) setAboutImagePreview(URL.createObjectURL(file))
  }
  const handleAboutPinnedChange = e => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value)
    setAboutPinned(options)
  }
  const handleAboutSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', aboutName)
    formData.append('description', aboutDesc)
    aboutPinned.forEach(id => formData.append('pinnedSkills', id))
    if (aboutImage) formData.append('profileImage', aboutImage)
    await axios.post(`${API_BASE}/about`, formData, { ...authHeader, headers: { ...authHeader.headers, 'Content-Type': 'multipart/form-data' } })
    const res = await axios.get(`${API_BASE}/about`)
    setAbout(res.data)
    setAboutImage(null)
  }

  const fontAwesomeIcons = [
    // Existing icons
    'faJava', 'faReact', 'faNodeJs', 'faJs', 'faPython', 'faDatabase', 'faCogs',
    'faHtml5', 'faCss3', 'faGit', 'faGithub', 'faAngular', 'faVuejs', 'faAws', 'faDocker', 'faLinux', 'faWindows', 'faApple', 'faAndroid', 'faPhp', 'faLaravel', 'faSwift', 'faRust', 'faGo', 'faFigma', 'faBootstrap', 'faSass', 'faNpm', 'faYarn', 'faJenkins', 'faSlack', 'faTrello', 'faJira', 'faChrome', 'faFirefox', 'faEdge', 'faOpera', 'faUbuntu',
    // Additional icons for more techs/frameworks/databases
    'faC',           // For C (use generic code/server icon)
    'faCuttlefish',  // For C++ (closest in FA)
    'faMicrosoft',   // For Microsoft/SQL Server
    'faGoogle',      // For Google Cloud
    'faCloud',       // Generic cloud
    'faLeaf',        // MongoDB (placeholder)
    'faServer',      // Server/DB
    'faCode',        // Generic code
    'faGitlab',      // GitLab CI/CD
    'faBitbucket',   // Bitbucket
    'faRedhat',      // RedHat
    'faCentos',      // CentOS
    'faJsSquare',    // JavaScript
    // Duplicates for clarity (ok to keep for dropdown)
    'faPython',      // Python (for Django/Flask)
    'faNodeJs',      // Node.js (for Express)
    'faHtml5',       // HTML5
    'faCss3',        // CSS3
    'faBootstrap',   // Bootstrap
    'faSass',        // Sass
    'faFigma',       // Figma
    'faJenkins',     // Jenkins
    'faSlack',       // Slack
    'faTrello',      // Trello
    'faJira',        // Jira
    'faChrome',      // Chrome
    'faFirefox',     // Firefox
    'faEdge',        // Edge
    'faOpera',       // Opera
    // ...add more as needed
  ]

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="admin-input-group">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
          {error && <div className="error-msg" style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </form>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
      <div className="admin-dashboard-tabs">
        <button onClick={() => setActiveTab('about')}>About</button>
        <button onClick={() => setActiveTab('projects')}>Projects</button>
        <button onClick={() => setActiveTab('skills')}>Skills</button>
        <button onClick={() => setActiveTab('education')}>Education</button>
        <button onClick={() => setActiveTab('certifications')}>Certifications</button>
      </div>
      <div className="admin-dashboard-content">
        {activeTab === 'about' && (
          <div>
            {/* About Me management */}
            <h3>About Me</h3>
            <form className="admin-form" onSubmit={handleAboutSubmit} encType="multipart/form-data" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <label style={{ fontWeight: 500 }}>Profile Image:</label>
              <input type="file" accept="image/*" onChange={handleAboutImageChange} />
              {aboutImagePreview && <img src={aboutImagePreview} alt="Profile Preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }} />}
              <input name="aboutName" value={aboutName} onChange={e => setAboutName(e.target.value)} placeholder="Your Name" required style={{ width: '100%' }} />
              <textarea name="aboutDesc" value={aboutDesc} onChange={e => setAboutDesc(e.target.value)} placeholder="Description" rows={3} style={{ width: '100%', resize: 'vertical' }} required />
              <label style={{ fontWeight: 500 }}>Pin Skills:</label>
              <select multiple value={aboutPinned} onChange={handleAboutPinnedChange} style={{ width: '100%', minHeight: 60 }}>
                {skills.map(skill => <option key={skill._id} value={skill._id}>{skill.name}</option>)}
              </select>
              <button type="submit" className="btn-primary">Save About Me</button>
            </form>
          </div>
        )}
        {activeTab === 'projects' && (
          <AdminProjects />
        )}
        {activeTab === 'skills' && (
          <div>
            {/* Skills CRUD */}
            <h3>Skills</h3>
            <form className="admin-form" onSubmit={editSkillId ? handleUpdateSkill : handleAddSkill}>
              <input name="name" value={editSkillId ? editSkill.name : newSkill.name} onChange={editSkillId ? handleEditSkillChange : handleSkillChange} placeholder="Skill Name (comma for multiple)" required />
              <select name="icon" value={editSkillId ? editSkill.icon : newSkill.icon} onChange={editSkillId ? handleEditSkillChange : handleSkillChange}>
                <option value="">-- Select Icon (or type below) --</option>
                {fontAwesomeIcons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input name="icon" value={editSkillId ? editSkill.icon : newSkill.icon} onChange={editSkillId ? handleEditSkillChange : handleSkillChange} placeholder="Or type FontAwesome icon name (e.g. faReact)" />
              <select name="category" value={editSkillId ? editSkill.category : newSkill.category} onChange={editSkillId ? handleEditSkillChange : handleSkillChange}>
                <option>Programming Languages</option>
                <option>Frameworks</option>
                <option>Databases</option>
                <option>Others</option>
              </select>
              <button type="submit" className="btn-primary">{editSkillId ? 'Update' : 'Add'} Skill</button>
              {editSkillId && <button type="button" onClick={() => setEditSkillId(null)}>Cancel</button>}
            </form>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th><th>Icon</th><th>Category</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.icon}</td>
                    <td>{s.category}</td>
                    <td>
                      <button onClick={() => handleEditSkill(s)} title="Edit"><FontAwesomeIcon icon={faEdit} /></button>
                      <button onClick={() => handleDeleteSkill(s._id)} title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'education' && (
          <AdminEducation />
        )}
        {activeTab === 'certifications' && (
          <AdminCertification />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
