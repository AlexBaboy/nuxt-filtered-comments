export const state = () => ({
  users: [
    {
      id: 1,
      name: 'Leanne Graham',
      sex: 'male'
    },
    {
      id: 2,
      name: 'July',
      sex: 'female'
    },
    {
      id: 3,
      name: 'User 3'
    }
  ]
})

export const getters = {
  getUsers: state => state.users
}
