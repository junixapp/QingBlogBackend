'use strict'

class ApiMsg {
    constructor(code, msg) {
        this.code = code
        this.msg = msg
    }
}

module.exports = {
    ApiMsg,

    //成功
    Success: new ApiMsg(0, "操作成功"),

    //错误定义
    //通用错误定义
    PermissionDenyError: new ApiMsg(-1, "权限不足"),
    AddError: new ApiMsg(-2, "添加失败"),
    DeleteError: new ApiMsg(-3, "删除失败"),
    UpdateError: new ApiMsg(-4, "更新失败"),
    QueryError: new ApiMsg(-5, "查询失败"),
    DBError: new ApiMsg(-6, "数据库操作失败"),
    UnknownError: new ApiMsg(-7, "未知错误"),
    PageMissError: new ApiMsg(-8, "缺少page"),
    PageWrongError: new ApiMsg(-9, "page不正确"),
    IdMissError: new ApiMsg(-10, "缺少id"),
    NameExistError: new ApiMsg(-11, "名字已存在"),

    //特殊错误定义
    //Token相关
    TokenInvalidError: new ApiMsg(-20, "token失效"),
    TokenMissError: new ApiMsg(-21, "缺少token"),
    TokenWrongError: new ApiMsg(-22, "token错误"),


    //用户相关
    UserNotFoundError: new ApiMsg(-30, "用户不存在"),
    UsernameOrPswMissError: new ApiMsg(-31, "缺少用户名或者密码"),
    UsernameOrPswWrongError: new ApiMsg(-32, "用户名或者错误"),
    UserAlreadyExistError: new ApiMsg(-33, "用户已存在"),
    UsernameMissError: new ApiMsg(-34, "缺少username"),
    AvatarMissError: new ApiMsg(-35, "缺少avatar"),

    //category
    CategoryMissError : new ApiMsg(-40, "缺少分类"),
    CategoryNameMissError : new ApiMsg(-41, "缺少分类名称"),
    CategoryNotFoundError : new ApiMsg(-41, "分类未找到"),

    //blog相关
    BlogNotFoundError: new ApiMsg(-50, "博客不存在"),
    BlogIdMissError: new ApiMsg(-51, "博客id不能缺少"),

    //stat相关
}
