function MyProfile() {
  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    api.get("/users/me").then(res => {
      setValue("name", res.data.name)
      setValue("email", res.data.email)
    })
  }, [])

  const onSubmit = async (data) => {
    await api.put("/users/me", data)
    alert("Profile updated")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("email")} />
      <button>Save</button>
    </form>
  )
}
