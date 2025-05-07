import * as Yup from 'yup'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField, } from '@mui/material'
import { Field, Form, Formik } from 'formik'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
import { saveToy } from '../store/actions/toy.actions'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

  const { toyId } = useParams()
  const navigate = useNavigate()

  const labels = toyService.getToyLabels()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(setToyToEdit)
      .catch(err => {
        console.log('Had issued in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  const ToySchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Too Short!')
      .max(20, 'Too Long!'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Price must be at least 1'),
    labels: Yup.array().of(Yup.string()),
  })

  function onSaveToy(values, { setSubmitting }) {
    saveToy(values)
      .then(() => {
        showSuccessMsg('Toy saved successfully')
        navigate('/toy')
      })
      .catch(err => {
        showErrorMsg('Cannot save toy')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

      <Formik
        enableReinitialize
        initialValues={toyToEdit}
        validationSchema={ToySchema}
        onSubmit={onSaveToy}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <Field
              as={TextField}
              label="Name"
              variant="outlined"
              name="name"
              required
              margin="normal"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              onChange={handleChange}
              value={values.name}
            />

            <Field
              as={TextField}
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              required
              margin="normal"
              inputProps={{ min: 1 }}
              error={touched.price && !!errors.price}
              helperText={touched.price && errors.price}
              onChange={handleChange}
              value={values.price}
            />

            <FormControl margin="normal">
              <InputLabel id="labels-label">Labels</InputLabel>
              <Select
                multiple
                labelId="labels-label"
                id="labels"
                name="labels"
                value={values.labels}
                onChange={handleChange}
                renderValue={selected => selected.join(', ')}
                style={{ minWidth: '20vw' }}
              >
                {labels.map(label => (
                  <MenuItem key={label} value={label}>
                    <Checkbox checked={values.labels.includes(label)} />
                    <ListItemText primary={label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" type="submit">
              {toyToEdit._id ? 'Save' : 'Add'}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
