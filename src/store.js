import React from 'react'
import ReactDOM from 'react-dom'
import { action, makeAutoObservable } from 'mobx'
import { loginApi, logoutApi, getInfoApi } from './api/user'
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  removeUserInfo,
} from './utils/auth'

class Store {
  token = getToken()
  name = ''
  avatar = ''

  constructor() {
    makeAutoObservable(this)
  }

  login(loginForm) {
    const { username, password } = loginForm
    return new Promise((resolve, reject) => {
      loginApi({ username: username.trim(), password: password })
        .then(
          action('success', response => {
            const { data } = response
            this.token = data.token
            setToken(data.token)
            resolve()
          })
        )
        .catch(error => {
          reject(error)
        })
    })
  }

  getInfo() {
    return new Promise((resolve, reject) => {
      getInfoApi(this.token)
        .then(
          action('success', response => {
            const { data } = response
            const { userInfo } = data
            this.name = userInfo.name
            this.avatar = userInfo.avatar
            setUserInfo(userInfo)
            resolve()
          })
        )
        .catch(error => {
          reject(error)
        })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      logoutApi(this.token)
        .then(
          action('success', () => {
            removeToken()
            removeUserInfo()
            this.token = ''
            this.name = ''
            this.avatar = ''
            resolve()
          })
        )
        .catch(error => {
          reject(error)
        })
    })
  }
}

const store = new Store()

export default store
