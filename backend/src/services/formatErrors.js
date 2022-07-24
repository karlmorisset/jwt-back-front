function formatErrors(rawErrors) {
  const errors = {}

  rawErrors?.details.forEach((d) => {
    errors[d.context.label] = d.message
  })

  return errors
}

module.exports = formatErrors
