import React, { useState } from 'react';
import {FaPlus, FaTrash,FaPen} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const App = () => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))

    const [date,setDate] = useState();
    const [task,setTask] = useState();
    const [discrip,setDiscrip] = useState();
    const [todos,setTodos] = useState(storageJobs ?? [] );
    const [showdialog,setShowDialog] = useState(false)
    const [deleteId,setDeleteId] = useState()
    const [checked,setChecked] = useState(true)
    const [showform,setShowForm] = useState(false)


    const [showEdit, setShowEdit] = useState(false) 
    const [name,setName] = useState()
    const [day,setDay] = useState()
    const [dis,setDis] = useState()

    const handleChecked = (data) =>{
        if(data === "checked" ){
            if(checked === true ){
                alert("Completed")
            }
            setChecked(!checked)
        }
    }
    const handleClose = () =>{
        setShowDialog(false)
    }
    const handleDelete = () =>{
        // const newTodos = todos.filter(todo => todo.id !== deleteId)
        // setTodos(newTodos)
        setTodos(pre => {
            const newArr = [...pre]
            console.log(newArr);
            return newArr.filter(todo => todo.id !== deleteId)
        })
        setShowDialog(false)
        localStorage.removeItem("jobs")
        
    }
    const handleShowDialog = (id) =>{
    setDeleteId(id)
    setShowDialog(true)
    console.log(id)
}
    const handleAdd = () =>{
        const fill = task && discrip && date
        if(fill){
            setTodos(prev =>
            {
                const newJobs = [...prev,{id: (todos.length + 1) ,task: task , discrip : discrip,date : date, status : false}]

                const jsonJobs = JSON.stringify(newJobs)
                localStorage.setItem('jobs', jsonJobs)

                return newJobs
            })
            setTask('')
            setDate('')
            setDiscrip('')
            setShowForm(false)
        }else{
            alert("Vui lòng diền đây đủ")
        }    
        console.log(todos)
    }
    const handleChange = () =>{
        setTodos(prev => [...prev,{task : name,discrip: dis,date: day}])
        setShowEdit(false)
        console.log(todos)
       
    }
    const handleShowForm = ()=>{
        setShowForm(true)
    }
    const handleCloseForm = () =>{
        setShowForm(false)
    }
    const handleShowEdit = (todo) =>{
      setName(todo.task)
      setDay(todo.date)
      setDis(todo.discrip)
      setShowEdit(true)
    }
    const handleCloseEdit = () =>{
      setShowEdit(false)
    }
    
    return(
        <div className='container-fluid'>
            <Modal show={showdialog} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Xóa Task này ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc xóa task này không ?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >
            No
            </Button>
            <Button variant="primary" onClick={handleDelete}>
            Yes
            </Button>
        </Modal.Footer>
            </Modal>
            <Modal show={showform} onHide={handleCloseForm}>
        <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Control
                value={task}
                type="text"
                placeholder="Task "
                autoFocus
                onChange={(event) => setTask(event.target.value)}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
            >
                <Form.Control placeholder='Discription' as="textarea" rows={3} value={discrip}                 onChange={(event) => setDiscrip(event.target.value)}
/>
            </Form.Group>
            <Form.Group
                className="mb-3"
            >
                <Form.Control placeholder='Discription' type='date' rows={3} value={date}                 onChange={(event) => setDate(event.target.value)}
/>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm}>
            Close
            </Button>
            <Button variant="success" onClick={handleAdd}>
            Save
            </Button>
        </Modal.Footer>
        </Modal>


        <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Control
                value={name}
                type="text"
                placeholder="Task"
                autoFocus
                onChange={(event) => setName(event.target.value)}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
            >
                <Form.Control placeholder='Discription' as="textarea" rows={3} value={dis}                 onChange={(event) => setDis(event.target.value)}
/>
            </Form.Group>
            <Form.Group
                className="mb-3"
            >
                <Form.Control type='date' rows={3} value={day}                 onChange={(event) => setDay(event.target.value)}
/>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
            Close
            </Button>
            <Button variant="success" onClick={handleChange}>
            Save Changes
            </Button>
        </Modal.Footer>
        </Modal>

            <div className='row mt-3'>
                <div className='col-12 d-flex justify-content-center'>
                    <h2>Todo</h2>
                </div>
            </div>
            <div className='container'>
            <div className='row'>
            <div className='col-10 d-flex justify-content-end'>
            <button className='btn btn-light' onClick={handleShowForm}>
                    <FaPlus className='m-2'/>
                    <span className=''>Add task</span>
                </button>
            </div>
            </div>
            </div>
            <div className='mt-2'>
                {/* {show? <div className='container-fluid' >
                    <div className='container' style={{border:"1px solid black",width:"922px",height:"140px",borderRadius:"5px"}}>
                    <div className='mt-2'>
                        <input placeholder='Task name' className='form-control' value={task} onChange={(event) => setTask(event.target.value)} style={{width:"900px", height:"30px",border:"none"}}/>
                    </div>
                    <div className='mt-2'>
                        <input className='form-control' value={discrip} onChange={(event) => setDiscrip(event.target.value)} placeholder='Description' style={{width:"900px", height:"40px",border:"hidden"}}/>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-2'>
                            <button className='btn btn-light' onClick={() => setShowDate(!showdate)}><span>Due Date</span></button>
                            <div className='row'>
                                <div className='col-12'>
                                    {showdate? <div className='container mt-2'>
                                        <div className='row mt-2'>
                                            <div className='col-3'>
                                            <input  style={{border:""}} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                                            </div>
                                        </div>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                        <div className='col-10 text-end'>
                            {date}
                        </div>
                    </div>
                    </div>
                    <div className='col-12 d-flex justify-content-end'>
                        <button className='btn btn-secondary m-2' onClick={() => setShow(false)}>Cancel</button>
                        <button className='btn btn-danger m-2' onClick={handleAdd}>Add task</button>
                    </div>
                </div> : null} */}
            </div>
            <div className='container-fluid'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Task</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {todos && todos.map((todo) => (<tr>
                                                    <th scope="row" key={todo.id}><input type="checkbox" value={checked} onChange={() => handleChecked("checked")} className=''/></th>
                                                    <td>{todo.task}</td>
                                                    <td>{todo.discrip}</td>
                                                    <td>{todo.date}</td>
                                                    <td>
                                                        <div className='row'>
                                                            <div className='col-4'></div>
                                                            <div className='col-2'>
                                                                <button onClick={() => handleShowDialog(todo.id)} className="btn btn-danger"><FaTrash/>
                                                                </button>  
                                                            </div>
                                                            <div className='col-2'>  
                                                            <div className='col-2'>
                                                                <button onClick={() => handleShowEdit(todo)} className="btn btn-warning"><FaPen/>
                                                                </button>  
                                                            </div>                                                  
                                                            </div>
                                                        </div>
                                                    </td>
                                                    </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    )
}
export default App;

