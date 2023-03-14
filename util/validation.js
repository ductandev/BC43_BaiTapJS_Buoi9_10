//Khai báo 1 prototype chứa các hàm kiểm tra nhập liệu
// Đưa vào đối tượng để dễ quản lí hơn, tường minh hơn
// var slug_name = 'áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ' 
// var slug_name = 'ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ' 
// var slug_name = 'á à ả ạ ã ă ắ ằ ẳ ẵ ặ â ấ ầ ẩ ẫ ậ é è ẻ ẽ ẹ ê ế ề ể ễ ệ i í ì ỉ ĩ ị ó ò ỏ õ ọ ô ố ồ ổ ỗ ộ ơ ớ ờ ở ỡ ợ ú ù ủ ũ ụ ư ứ ừ ử ữ ự ý ỳ ỷ ỹ ỵ đ'
function Validation() {
    this.kiemTraRong = function (value, idError, name) {
        try {
            if (value.trim() === '') {
                document.getElementById(idError).innerHTML = `${name} không được bỏ trống !`;
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        catch {
            // Bắt lỗi xem thằng nào bị lỗi
            console.log(name)
        }
    }

    
    // KIỂM TRA TÀI KHOẢN
    this.kiemTraDoDaiVaKySo = function (value, idError, name, minLength, maxLength) {
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            // 'abcd'.length = 4
            if (value.length < minLength || value.length > maxLength) {
                document.getElementById(idError).innerHTML = `${name} tối đa từ ${minLength} đến ${maxLength} số!`
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ. Vui lòng chỉ nhập số ! Tối đa từ ${minLength} đến ${maxLength} số!`
        document.getElementById(idError).style.display = 'block'
        return false;
    }


    // KIỂM TRA TÊN
    this.kiemTraKyTu = function (value, idError, name) {
        // Để khoản trống vì tên người có khoản trống mới hợp lệ.
        var regexLetter = /^[A-Z a-z áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/;
        // Nếu chuỗi định dạng test thành công value thì true
        if (regexLetter.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} tất cả phải là chữ`;
        document.getElementById(idError).style.display = 'block'
        return false;
    }


    // KIỂM TRA EMAIL
    this.kiemTraEmail = function (value, idError, name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ !`
        document.getElementById(idError).style.display = 'block'
        return false;
    }


    // KIỂM TRA PASSWORD
    this.kiemTraPassword = function (value, idError, name, minLength, maxLength) {
        var regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]{6,10}$/;
        if (regexPassword.test(value)) {
            if (value.length < minLength || value.length > maxLength) {
                document.getElementById(idError).innerHTML = `${name} phải từ ${minLength} đến ${maxLength} ký tự. Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!`
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} phải từ ${minLength} đến ${maxLength} ký tự. Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!`
        document.getElementById(idError).style.display = 'block'
        return false;
    }


    // KIỂM TRA LƯƠNG CƠ BẢN
    this.kiemTraLuongCB = function (value, idError, name, minLength, maxLength) {
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            // 'abcd'.length = 4
            if (value < minLength || value > maxLength) {
                document.getElementById(idError).innerHTML = `${name} tối đa từ ${minLength} đến ${maxLength}!`
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ. Vui lòng chỉ nhập số. Tối đa từ ${minLength} đến ${maxLength} !`
        document.getElementById(idError).style.display = 'block'
        return false;
    }


    // KIỂM TRA CHỨC VỤ
    this.kiemTraChucVu = function (value, idError, name) {
        if (value === 'Chọn chức vụ') {
            document.getElementById(idError).innerHTML = `Vui lòng chọn ${name}!`
            document.getElementById(idError).style.display = 'block'
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }


    // KIỂM TRA SỐ GIỜ LÀM
    this.kiemTraSoGioLam = function (value, idError, name, minLength, maxLength) {
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9.]+$/;
        if (regexNumber.test(value)) {
            // 'abcd'.length = 4
            if (value < minLength || value > maxLength) {
                document.getElementById(idError).innerHTML = `${name} trong tháng từ ${minLength} đến ${maxLength}!`
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ. Vui lòng chỉ nhập số. Tối đa trong tháng từ ${minLength} đến ${maxLength} giờ !`
        document.getElementById(idError).style.display = 'block'
        return false;
    }
}



