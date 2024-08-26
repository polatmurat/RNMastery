import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { setUserToken } from '@/features/reducers/authReducer'
import { useUserRegisterMutation } from '@/features/services/auth/authService'
import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, ScrollView, View, Image } from 'react-native'
import { useDispatch } from 'react-redux'

const SignUp = () => {

  const dispatch = useDispatch();
  const [register, response] = useUserRegisterMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onSignUpPress = async () => {
    await register(form);
  }


  useEffect(() => {
    if(response.isSuccess) {
      const token = response?.data?.result?.token;
      dispatch(setUserToken(token));
      router.replace('/(root)/(tabs)/home');
    } else if(response.isError) {
      const errorData = response?.error?.data || "No data available.";
      console.log("ERROR : ", errorData);
      
    }
  }, [response]);
  
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Create Your Account</Text>
        </View>

        <View className='p-5'>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton title='Sign Up' onPress={onSignUpPress} className='mt-6' />

          <OAuth />

          <Link href='/sign-in' className='text-lg text-center text-general-200 mt-10'>
            <Text>Already have an account? {" "}</Text>
            <Text className='text-primary-500'>Sign In</Text>
          </Link>

        </View>

        {/* Verification Modal */}

      </View>
    </ScrollView>
  )
}

export default SignUp