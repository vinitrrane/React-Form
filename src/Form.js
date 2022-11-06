import React from 'react'
import { useForm } from 'react-hook-form'
import *  as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Form = () => {

    const schema = yup.object().shape({
        fullName: yup.string().required('Full Name is required!'),

        email: yup.string().email().required('Email is required!'),

        age: yup.number('Please add valid age').typeError('Age is required!').positive('Please enter valid age!').integer('Please enter valid age!').min(18, 'Age should be above than 18!').max(110, 'Age should be below than 110!').required('Age is required!'),

        password: yup.string().min(6, 'Password must be at least 6 characters!').max(10, 'Password must be at least 6 characters!').required('Password is required!'),

        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password does not match!').required('Confirm Password is required!'),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' placeholder='Full Name' {...register('fullName')} /><br /><p>{errors.fullName?.message}</p>
            <input type='email' placeholder='Email' {...register('email')} /><br /><p>{errors.email?.message}</p>
            <input type='number' placeholder='Age' {...register('age')} /><br /><p>{errors.age?.message}</p>
            <input type='password' placeholder='Password' {...register('password')} /><br /><p>{errors.password?.message}</p>
            <input type='password' placeholder='Confirm Password' {...register('confirmPassword')} /><br /><p>{errors.confirmPassword?.message}</p>
            <input className='formBtn' type='submit' />
        </form>
    )
}

export default Form