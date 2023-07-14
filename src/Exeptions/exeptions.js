
class ApiError {
    constructor({status, message}) {
        this.isOk = false
        this.status = status
        this.message = message
    }

    static BadRequest({status, message = "Серверная ошибка"}) {
        return new this({status, message})
    }
}

export default ApiError