import { Button } from '@material-ui/core';
import React from 'react'

function AddTodo() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        console.log('you clicked close', open)
        setOpen(false);
      };
    return (
        <div>
            <h1>Hello</h1>
            <Button onClick={handleClose}>Close</Button>
        </div>
    )
}

export default AddTodo
