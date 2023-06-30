export default defineCachedEventHandler(async () => {
    const config = useRuntimeConfig()
    try{
        const data = await $fetch(`${config.public.apiUrl}/shopxp/Api/`, {
            method: 'GET',
        })
        return data;
    } catch (err) {
        console.error(err)
    }
})