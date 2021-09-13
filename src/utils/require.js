import axios from 'axios'

const require = axios.create({
  baseURL: 'https://tianyuhao.icu/backstage/virgo_tyh_php/public/index.php/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default require
