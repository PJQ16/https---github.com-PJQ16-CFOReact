const config = {
        urlApi:'http://localhost:3084',
        token_name:'pos_token',
        headers:() => {
                return{
                headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('pos_token')
                         }
                }
        }
}
export default config;