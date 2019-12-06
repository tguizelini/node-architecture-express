class HttpResponse {
  success (data = null, message = 'Success') {
    return {
      status: 200,
      message,
      data
    }
  }

  forbiden (data = null, message = 'Business Error') {
    return {
      status: 403,
      message,
      data
    }
  }

  unauthorizedError (data = null, message = 'Unauthorized') {
    return {
      status: 401,
      message,
      data
    }
  }

  badRequest (data = null, message = 'Bad Request') {
    return {
      status: 400,
      message,
      data
    }
  }

  serverError (data = null, message = 'Internal Server Error') {
    return {
      status: 500,
      message,
      data
    }
  }
}

module.exports = new HttpResponse()