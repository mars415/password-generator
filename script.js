const resultEl = document.getElementById('result')
const clipboardEl = document.getElementById('clipboard')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numberEl = document.getElementById('numbers')
const symbolEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText

  if (!password) {
    return
  }

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasUpper = uppercaseEl.checked
  const hasLower = lowercaseEl.checked
  const hasNumber = numberEl.checked
  const hasSymbol = symbolEl.checked

  resultEl.innerText = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  )
})

function generatePassword(length, upper, lower, number, symbol) {
  let generatedPassword = ''
  const typesCount = upper + lower + number + symbol
  const typesArray = [{upper}, {lower}, {number}, {symbol}].filter(
    (item) => Object.values(item)[0]
  )

  if (typesCount === 0) {
    generatePassword = ''
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0]
      generatedPassword += randomFunc[funcName]()
    })
  }
  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}

//fromCharCode = ASCII code
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
