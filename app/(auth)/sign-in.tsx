import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { setUserToken } from '@/features/reducers/authReducer'
import { useUserLoginMutation } from '@/features/services/auth/authService'
import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, ScrollView, View, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { ReactNativeModal } from 'react-native-modal';

const SignIn = () => {
  
  const [login, response] = useUserLoginMutation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onSignInPress = async () => {
    await login(form);
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
  }, [response])

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Welcome 👋</Text>
        </View>

        <View className='p-5'>
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

          <CustomButton title='Sign In' onPress={onSignInPress} className='mt-6' disabled={response.isLoading} />

          <OAuth />

          <Link href='/sign-up' className='text-lg text-center text-general-200 mt-10'>
            <Text>Don't have an account? {" "}</Text>
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>

        {/* <ReactNativeModal isVisible={response.isSuccess}><View className=''>It can be improved.</View></ReactNativeModal> */}
        

      </View>
    </ScrollView>
  )
}

export default SignIn