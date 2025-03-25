import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router';
const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const handleSearch = (text: string) => {
    setSearch(text);
  }

  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-full bg-accent-100 border border-primary-100 mt-5 py-2'>
      <View className=''>

      </View>
    </View>
  )
}

export default Search