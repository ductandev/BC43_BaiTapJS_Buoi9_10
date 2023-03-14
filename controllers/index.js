// Mô hình MVC
/*
    M (models): nơi chứa các files js là prototype hay gọi là (class)
    V (views): nơi chứa các files giao diện (.html)
    C (controllers): các files điều hướng giao diện (index.html -> index.js, qlsp => qlsp.js)
    --------------------------------------------
    util: chứa file dùng chung cho dự án( ví dụ: các method sử dụng ở các dự án trước, hoặc libs(thư viện js))
    assets: là folder chứa tài nguyên của hệ thống (img, audio, video, css, font, ...)
*/

var mangNhanVien = [];
var mangNhanVienNew = [];
var kiemtra = new Validation();


// Để khoản trống vì tên người có khoản trống mới hợp lệ.
var regex = /^[A-Z a-z]+$/;
var result = regex.test('nguyen van a');
console.log(result);


document.getElementById('btnThemNV').onclick = function () {

    // input: nhanVien: NhanVien
    var nv = new NhanVien();
    nv.taiKhoan = document.querySelector('#taiKhoan').value;
    nv.hoVaTen = document.querySelector('#hoVaTen').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#matKhau').value;
    nv.ngayLam = document.querySelector('#ngayLam').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.heSoLuong = document.querySelector('#chucVu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    // Lấy selected chức vụ html.
    var tagSelect = document.getElementById('chucVu');
    var viTriTheChon = tagSelect.selectedIndex;     // .selectedIndex: => chỉ ra vị trí thẻ được chọn.
    var chucVu = tagSelect.options[viTriTheChon].innerHTML;
    nv.chucVu = chucVu;
    console.log(nv)

    // Kiểm tra dữ liệu đầu vào
    var valid = true;
    // Kiểm tra Validation dữ liệu nhập
    valid = checkValidation(nv)

    if (!valid) {
        return;
    }

    // ouput:
    // Mỗi lần click thêm nhân viên => thêm vào mảng nhân viên.
    mangNhanVien.push(nv);
    console.log('Mảng nhân viên: ', mangNhanVien);
    // Từ mảng tạo ra giao diện
    renderTableNhanVien(mangNhanVien);
    // Lưu mảng sinh viên vào storage
    luuLocalStorage();
}


function renderTableNhanVien(arrNhanVien) { //input là mangNhanVien = [{},{},...]
    var htmlString = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        htmlString += `
            <tr class="text-nowrap">
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoVaTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                    <button class='btn btn-danger' onclick="xoaNhanVienTheoTaiKhoan('${nv.taiKhoan}')"><i class="fa fa-trash-alt"></i></button>
                </td>
                <td>
                    <button class='btn btn-success' data-toggle="modal" data-target="#myModal" onclick="layThongTin('${nv.taiKhoan}')"> <i class="fa fa-user-cog"></i> </button>
                </td>
            </tr>
        `;
    }
    document.querySelector('tbody').innerHTML = htmlString;
    return htmlString;
}

function xoaNhanVienTheoTaiKhoan(taiKhoanNVClick) {
    var indexDel = -1;
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === taiKhoanNVClick) {
            indexDel = index;
            break;
        }
    }
    // Xóa đi sinh viên tại vị trí đó trong mảng
    mangNhanVien.splice(indexDel, 1);
    // Tạo lại bảng table Sinh Viên
    renderTableNhanVien(mangNhanVien);
    luuLocalStorage();
}

function layThongTin(TKNhanVienClick) {
    // tắt input#taiKhoan button#btnThemNV và mở button#btnCapNhat
    document.getElementById('taiKhoan').disabled = true;
    document.getElementById('btnThemNV').disabled = true;
    document.getElementById('btnCapNhat').disabled = false;
    // Tắt tất cả các thẻ span thông báo lỗi trước tránh lưu của cái cũ
    tatThongBaoValidation();

    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === TKNhanVienClick) {
            //in thông tin sinh viên tìm thấy lên giao diện
            document.getElementById('taiKhoan').value = mangNhanVien[index].taiKhoan;
            document.getElementById('hoVaTen').value = mangNhanVien[index].hoVaTen;
            document.getElementById('email').value = mangNhanVien[index].email;
            document.getElementById('matKhau').value = mangNhanVien[index].matKhau;
            document.getElementById('ngayLam').value = mangNhanVien[index].ngayLam;
            document.getElementById('luongCoBan').value = mangNhanVien[index].luongCoBan;
            document.getElementById('chucVu').value = mangNhanVien[index].heSoLuong;
            document.getElementById('gioLam').value = mangNhanVien[index].gioLam;
            break;
        }
    }
}

document.getElementById('btnCapNhat').onclick = function () {
    // Input: lấy thôg tin người dùng từ giao diện đã thay đổi đưa vào object
    var nhanVienEdit = new NhanVien();
    nhanVienEdit.taiKhoan = document.getElementById('taiKhoan').value;
    nhanVienEdit.hoVaTen = document.getElementById('hoVaTen').value;
    nhanVienEdit.email = document.getElementById('email').value;
    nhanVienEdit.matKhau = document.getElementById('matKhau').value;
    nhanVienEdit.ngayLam = document.getElementById('ngayLam').value;
    nhanVienEdit.luongCoBan = document.getElementById('luongCoBan').value;
    nhanVienEdit.heSoLuong = document.getElementById('chucVu').value;
    nhanVienEdit.gioLam = document.getElementById('gioLam').value;

    var tagSelect = document.getElementById('chucVu');
    var viTriTheChon = tagSelect.selectedIndex;     // .selectedIndex: => chỉ ra vị trí thẻ được chọn.
    var chucVu = tagSelect.options[viTriTheChon].innerHTML;
    nhanVienEdit.chucVu = chucVu;
    console.log('nhanVienEdit ', nhanVienEdit)


    // Kiểm tra dữ liệu đầu vào
    var valid = true;
    // chekValidation dữ liệu
    valid = checkValidation(nhanVienEdit);

    if (!valid) {
        return;
    }


    //Tìm ra sinh viên trong mảng => duyệt mảng lấy mã so sánh
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === nhanVienEdit.taiKhoan) {
            //Tìm thấy object sinh viên trong mảng => gán các giá trị của object trong mảng = object edit
            mangNhanVien[index].hoVaTen = nhanVienEdit.hoVaTen;
            mangNhanVien[index].email = nhanVienEdit.email;
            mangNhanVien[index].matKhau = nhanVienEdit.matKhau;
            mangNhanVien[index].ngayLam = nhanVienEdit.ngayLam;
            mangNhanVien[index].luongCoBan = nhanVienEdit.luongCoBan;
            mangNhanVien[index].heSoLuong = nhanVienEdit.heSoLuong;
            mangNhanVien[index].gioLam = nhanVienEdit.gioLam;
            mangNhanVien[index].chucVu = nhanVienEdit.chucVu;
            break;
        }
    }
    //Gọi hàm render sinh viên dựa trên mảng có phần tử đã thay đổi
    renderTableNhanVien(mangNhanVien)
    //Lưu store sau khi thay đổi
    luuLocalStorage();
    //Lưu xong mới bật 2 nút button#btnThemNV và input#taiKhoan tắt button#btnCapNhat
    document.getElementById('taiKhoan').disabled = false;
    document.getElementById('btnThemNV').disabled = false;
    document.getElementById('btnCapNhat').disabled = true;
    console.log(mangNhanVien)
}


// Hàm lưu trữ dữ liệu vào localstorage
function luuLocalStorage() {
    // Lưu mảng nhân viên vào logostorage
    // B1: Biến đổi mangNhanVien thành string.
    var stringMangNhanVien = JSON.stringify(mangNhanVien);
    // B2: setItem: Lưu vào localstorage
    localStorage.setItem('mangNhanVien', stringMangNhanVien);
}


function layStore() {
    // getItem: lấy dữ liệu từ localstorage
    if (localStorage.getItem('mangNhanVien')) {
        var stringMangNhanVien = localStorage.getItem('mangNhanVien');
        console.log(stringMangNhanVien);

        // Chuyển dữ liệu string về dạng object
        mangNhanVien = JSON.parse(stringMangNhanVien);
        console.log("mangNhanVien", mangNhanVien);


        for (index = 0; index < mangNhanVien.length; index++) {
            // Sau khi parse thì object ko có hàm tính tongLuong và xepLoaiNhanVien.
            // Tạo prototype mới để chứa dữ liệu sau khi lấy từ localStorage để có hàm tính tongLuong và xepLoaiNhanVien.
            var nvNew = new NhanVien();

            nvNew.taiKhoan = mangNhanVien[index].taiKhoan
            nvNew.hoVaTen = mangNhanVien[index].hoVaTen
            nvNew.email = mangNhanVien[index].email
            nvNew.matKhau = mangNhanVien[index].matKhau
            nvNew.ngayLam = mangNhanVien[index].ngayLam
            nvNew.luongCoBan = mangNhanVien[index].luongCoBan
            nvNew.heSoLuong = mangNhanVien[index].heSoLuong
            nvNew.chucVu = mangNhanVien[index].chucVu
            nvNew.gioLam = mangNhanVien[index].gioLam
            // Thêm dữ liệu vào mảng mangNhanVienNew
            mangNhanVienNew.push(nvNew)
        }
        // Gán lại giá trị về lại cho mangNhanVien để sử dụng hàm xóa
        mangNhanVien = mangNhanVienNew
        console.log("mangNhanVienNew", mangNhanVienNew)


        // // Gọi hàm tạo giao diện từ mảng, parse: chuyển về dạng object
        renderTableNhanVien(mangNhanVien);
    }
}



// Lấy Logostorage load lên giao diện
layStore();
// Tắt nút cập nhật ban đầu
document.getElementById('btnThem').onclick = function () {
    document.getElementById('btnThemNV').disabled = false;
    document.getElementById('btnCapNhat').disabled = true;
    document.getElementById('taiKhoan').disabled = false;
}





// Định nghĩa sự kiện gõ chữ vào ô input
document.getElementById('searchName').oninput = function () {
    // input: từ khóa
    var tuKhoa = document.getElementById('searchName').value;

    // tolowerCase(): biến đổi tất cả chữ hoa thành chữ thường
    // trim(): loại bỏ khoản trống đầu và cuối của chuỗi     a  => a
    tuKhoa = stringToslug(tuKhoa);
    //output: mangXepLoaiTimKiem = [];
    var mangXepLoaiTimKiem = [];
    for (var index = 0; index < mangNhanVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
        var nv = mangNhanVien[index];
        // Biến đổi xếp loại nhân viên thành chữ không dấu
        var xepLoai = stringToslug(nv.xepLoaiNhanVien());

        //Lấy ra tên so sánh với từ khoá
        if (xepLoai.search(tuKhoa) !== -1) {
            //tìm thấy
            mangXepLoaiTimKiem.push(nv);
            console.log(mangXepLoaiTimKiem)
        }
    }

    renderTableNhanVien(mangXepLoaiTimKiem);
}


function stringToslug(title) {
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}


// Hàm tắt thông báo trước khi hiển thị dành cho chỉnh sữa
function tatThongBaoValidation(){
    document.getElementById('tbTKNV').style.display = 'none'
    document.getElementById('error-min-max-length-taiKhoan').style.display = 'none'
    document.getElementById('tbTen').style.display = 'none'
    document.getElementById('error-allLetter-tenNhanVien').style.display = 'none'
    document.getElementById('tbEmail').style.display = 'none'
    document.getElementById('error-allLetter-email').style.display = 'none'
    document.getElementById('tbMatKhau').style.display = 'none'
    document.getElementById('error-min-max-length-allLetter-matKhau').style.display = 'none'
    document.getElementById('tbNgay').style.display = 'none'
    document.getElementById('tbLuongCB').style.display = 'none'
    document.getElementById('error-min-max-luongCB').style.display = 'none'
    document.getElementById('tbChucVu').style.display = 'none'
    document.getElementById('error-ChucVu').style.display = 'none'
    document.getElementById('tbGiolam').style.display = 'none'
    document.getElementById('error-min-max-soGioLam').style.display = 'none'
}


// Kiểm tra validation 
function checkValidation(dataNV){
    // Kiểm tra rỗng
    valid = kiemtra.kiemTraRong(dataNV.taiKhoan, 'tbTKNV', 'Tài khoản') & kiemtra.kiemTraRong(dataNV.hoVaTen, 'tbTen', 'Họ và tên') & kiemtra.kiemTraRong(dataNV.email, 'tbEmail', 'Email') & kiemtra.kiemTraRong(dataNV.matKhau, 'tbMatKhau', 'Mật khẩu') & kiemtra.kiemTraRong(dataNV.ngayLam, 'tbNgay', 'Ngày làm') & kiemtra.kiemTraRong(dataNV.luongCoBan, 'tbLuongCB', 'Lương cơ bản') & kiemtra.kiemTraRong(dataNV.gioLam, 'tbGiolam', 'Giờ làm');
    // Kiểm tra Tài khoản tối đa 4-6 "ký số"
    valid = valid & kiemtra.kiemTraDoDaiVaKySo(dataNV.taiKhoan, 'error-min-max-length-taiKhoan', 'Tài khoản', 4, 6)
    // Kiểm tra định dạng ký tự họ và tên
    valid = valid & kiemtra.kiemTraKyTu(dataNV.hoVaTen, 'error-allLetter-tenNhanVien', 'Họ và tên');
    // Kiểm tra email
    valid = valid & kiemtra.kiemTraEmail(dataNV.email, 'error-allLetter-email', 'Email');
    // Kiểm tra mật khẩu
    valid = valid & kiemtra.kiemTraPassword(dataNV.matKhau, 'error-min-max-length-allLetter-matKhau', 'Mật khẩu', 6, 10)
    // Kiểm tra lương cơ bản
    valid = valid & kiemtra.kiemTraLuongCB(dataNV.luongCoBan, 'error-min-max-luongCB', 'Lương cơ bản', 1000000, 20000000)
    // Kiểm tra chức vụ
    valid = valid & kiemtra.kiemTraChucVu(dataNV.chucVu, 'error-ChucVu', 'chức vụ')
    // Kiểm tra số giờ làm
    valid = valid & kiemtra.kiemTraSoGioLam(dataNV.gioLam, 'error-min-max-soGioLam', 'Số giờ làm', 80, 200)

    return valid;
}
    


