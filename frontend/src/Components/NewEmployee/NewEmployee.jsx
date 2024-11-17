import { useEffect, useState } from "react";
import './NewEmployee.css'
import axios from "axios";

function NewEmployee() {
    const [isEditing, setIsEditing] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [msg, setMsg] = useState('')
    const currentDate = new Date().toISOString().substring(0, 10)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        role: '',
        department: '',
        employment_type: '',
        location: '',
        salary: 5000,
        startdate: currentDate
    })

    const { firstname, lastname } = formData

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(prev => !prev)
    }

    async function submitForm() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/add`, formData)
            console.log('should be sent')
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (submitted) {
            submitForm()
        }
    }, [submitted])

    return (
        <div className={isEditing ? 'newEmployeeCard edit' : 'newEmployeeCard addNew'}>
            {isEditing ?
                <>
                    <p className="emName">Add employee</p>
                    <div className="frame">
                        {firstname && lastname && <img
                            src={`https://robohash.org/${firstname}${lastname}.png?set=set5&size=175x175`}
                        ></img>}
                    </div>
                    <form>
                        <div>
                            <label htmlFor="firstname">Firstname</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='firstname' id='firstname' value={formData.firstname} />
                        </div>
                        <div>

                            <label htmlFor="lastname">Lastname</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='lastname' id='lastname' value={formData.lastname} />
                        </div>
                        <div>
                            <label htmlFor="role">Role</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='role' id='role' value={formData.role} />
                        </div>
                        <div>
                            <label htmlFor="department">Department</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='department' id='department' value={formData.department} />
                        </div>
                        <div>

                            <label htmlFor="employment_type">Employment type</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='employment_type' id='employment_type' value={formData.employment_type} />
                        </div>
                        <div>

                            <label htmlFor="location">Location</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='location' id='location' value={formData.location} />
                        </div>
                        <div>

                            <label htmlFor="salary">Initial salary</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='salary' id='salary' value={formData.salary} />
                        </div>
                        {msg && <p>{msg}</p>}
                        <div>

                            <button type='button' onClick={() => setIsEditing(prev => !prev)}>Cancel</button>
                            <button onClick={(e) => handleSubmit(e)} type="submit">Submit</button>
                        </div>
                    </form>
                </>
                :
                <>
                    <button onClick={() => setIsEditing(prev => !prev)}>
                        <img src={`${import.meta.env.VITE_REACT_URL}/add_icon.svg`} alt="Add employee Icon" />
                    </button>
                    <p>Add new employee</p>
                </>
            }
        </div >
    )
}

export default NewEmployee;