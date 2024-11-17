import { useEffect, useState } from "react";
import './NewEmployee.css'

function NewEmployee() {
    const [isEditing, setIsEditing] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [msg, setMsg] = useState('')
    const currentDate = new Date();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        role: '',
        employment_type: '',
        location: '',
        salary: null,
        startdate: currentDate
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmit(prev => !prev)
    }

    useEffect(() => {
        if (submit) {
            console.log(formData)
        }
    }, [submit])

    return (
        <div className={isEditing ? 'newEmployeeCard edit' : 'newEmployeeCard addNew'}>
            {isEditing ?
                <>
                    <p className="emName">Add employee</p>
                    <div className="frame"></div>
                    <form action="">
                        <div>
                            <label htmlFor="firstname">Firstname</label>
                            <input onChange={(e) => handleChange(e)} type="text" name='firstname' id='firstname' />
                        </div>
                        <div>

                            <label htmlFor="lastname">Lastname</label>
                            <input type="text" name='lastname' id='lastname' />
                        </div>
                        <div>

                            <label htmlFor="role">Role</label>
                            <input type="text" name='role' id='role' />
                        </div>
                        <div>

                            <label htmlFor="employment_type">Employment type</label>
                            <input type="text" name='employment_type' id='employment_type' />
                        </div>
                        <div>

                            <label htmlFor="location">Location</label>
                            <input type="text" name='location' id='location' />
                        </div>
                        <div>

                            <label htmlFor="salary">Initial salary</label>
                            <input type="text" name='salary' id='salary' />
                        </div>
                        {msg && <p>{msg}</p>}
                        <div>

                        <button type='button' onClick={() => setIsEditing(prev => !prev)}>Cancel</button>
                        <button type="submit">Submit</button>
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