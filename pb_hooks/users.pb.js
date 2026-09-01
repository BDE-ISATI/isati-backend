
onRecordUpdateRequest((e) => {

    if (e.hasSuperuserAuth()) {
        return e.next()
    }

    const { checkUpdateUsernameValidation, touchUsernameChangedAt } = require(`${__hooks}/utils/username.js`)
    const { hasPermission, checkNoUnauthorizedFieldChanges, checkUserId } = require(`${__hooks}/utils/permissions.js`)
    const { sendPasswordEmail } = require(`${__hooks}/utils/mail.js`)



    if (!hasPermission(e, "users", "update")) {
        checkNoUnauthorizedFieldChanges(e, ["username","avatar","password","school_year","level","speciality"])
        checkUserId(e)
        checkUpdateUsernameValidation(e)
    }

    touchUsernameChangedAt(e)

    e.next()

    sendPasswordEmail(e)

}, 'users')



onRecordEnrich((e) => {

    const info = e.requestInfo

    if (info && info.hasSuperuserAuth()) {
        e.record.ignoreEmailVisibility(true)
        return e.next()
    }

    const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

    if (info && info.auth && hasPermission(info, "wei_panel", "view")) {
        e.record.ignoreEmailVisibility(true)
    }

    e.next()

}, 'users')
