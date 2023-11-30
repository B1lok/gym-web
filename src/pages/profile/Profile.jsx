import React from 'react';
import * as styles from './Profile.styles';
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import Sidebar from "../../components/common/layout/sidebar/Sidebar";
import {string, z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const Profile = () => {
    const signUpSchema = z
        .object({
            firstName: string()
                .regex(new RegExp('^[a-zA-Z]+$'), 'Latin letters only')
                .max(32, 'Too long'),
            lastName: string()
                .regex(new RegExp('^[a-zA-Z]+$'), 'Latin letters only')
                .max(32, 'Too long'),
            phoneNumber: string()
                .regex(new RegExp('^\\+38\\(0[0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}$'), 'Invalid phone number'),
            email: string()
                .email('Invalid email address'),
            // password: string()
            //     .min(1, 'Password is required')
            //     .min(8, '8 characters are required')
            //     .max(32, 'Too long'),
            // confirmPassword: string()
        })
    // .refine(data => data.password === data.confirmPassword, {
    //     message: "Passwords don't match",
    //     path: ['confirmPassword']
    // })

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        control
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (data) => {
        // delete data.confirmPassword
        // const updateResponse = await UserService.(data)
        //
        // if ('message' in signUpResponse) {
        //     setError('root.serverError', {
        //         type: signUpResponse.message
        //     })
        //     return
        // }
        //
        // const signInData = {email: data.email, password: data.password}
        // const signInResponse = await AuthService.signIn(signInData)
        //
        // if ('message' in signInResponse) {
        //     setError('root.serverError', {
        //         type: signInResponse.message
        //     })
        //     return
        // }
        //
        // setIsAuth(true)
        // localStorage.setItem('auth', 'true')
        // setToken(signInResponse.data.token)
        // localStorage.setItem('token', signInResponse.data.token)
        //
        // const decodedJwt = jwtDecode(signInResponse.data.token)
        // setRoles(decodedJwt.roles)
        // localStorage.setItem('roles', JSON.stringify(decodedJwt.roles))
        // navigate(MAIN_ROUTE)
    }

    return (
        <PageLayout hasHeader hasFooter>
            <Sidebar hasHeader hasFooter sx={styles.main}>

            </Sidebar>
        </PageLayout>
    );
};

export default Profile;