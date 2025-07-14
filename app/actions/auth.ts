'use server'

import { z } from 'zod'
import {
  verifyPassword,
  createSession,
  createUser,
  deleteSession,
} from '@/lib/auth'
import { getUserByEmail } from '@/lib/dal'
import { mockDelay } from '@/lib/utils'
import { redirect } from 'next/navigation'
import UserEmail from '../components/UserEmail'

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}


export const signIn = async (formData: FormData): Promise<ActionResponse> => {

  try {
    
    const data = {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
    }

  //validate with zod schema
  const validation = SignInSchema.safeParse(data)

  if (!validation.success) {
    return Promise.resolve({
      success: false,
      message: 'Validation failed',
      errors: validation.error.flatten().fieldErrors,
    })
  } 

  //find user by email
  const user = await getUserByEmail(data.email)

  if (!user) {
    return Promise.resolve({
      success: false,
      message: 'User not found',
      errors: {
          email: ['Invalid email or password'],
        },
    })
  } 

 //verify password
  const isValidPassword = await verifyPassword(data.password, user.password)  

  if (!isValidPassword) {
    return Promise.resolve({
      success: false,
      message: 'Invalid email or password',
      errors: {
        password: ['Invalid email or password'],
      },
    })
  } 


 // create session
  const session = await createSession(user.id)    


  return {
    success: true,
    message: 'Sign in successful',
  }


  } catch (error) {
    console.error('Error during sign in:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: 'UnexpectedError',
    }
  }

}


export const signUp = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const data = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      confirmPassword: formData.get('confirmPassword')?.toString() || '',
    }

    // Validate with Zod schema
    const validation = SignUpSchema.safeParse(data)

    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      }
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists',
        errors: { email: ['Email is already registered'] },
      }
    }

    // Create new user
    const newUser = await createUser(data.email, data.password)

    // Create session for the new user
    await createSession(newUser.id)

    return {
      success: true,
      message: 'Sign up successful',
    }
  } catch (error) {
    console.error('Error during sign up:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: 'UnexpectedError',
    }
  }
}

export const signOut = async (): Promise<ActionResponse> => {
  try {
    // Delete the session
     await mockDelay(300)
    await deleteSession()

    // Redirect to home page after sign out
    redirect('/')

    return {
      success: true,
      message: 'Sign out successful',
    }
  } catch (error) {
    console.error('Error during sign out:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: 'UnexpectedError',
    }
  }
} 