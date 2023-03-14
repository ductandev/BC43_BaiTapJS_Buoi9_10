// Prototype chữ cái đầu tiên sẽ viết hoa để nhận diện đây là --Prototype--
// Định nghĩa prototype NhanVien
// Đây gọi là prototype - (class): format của object (nói cách khác là 1 kiểu dữ liệu mà ta tự định nghĩa)
function NhanVien(){
    this.taiKhoan = '';
    this.hoVaTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.heSoLuong = 0;
    this.chucVu = '';
    this.gioLam = 0;
    
    this.tongLuong = function(){
        return this.luongCoBan * this.heSoLuong
    }
    this.xepLoaiNhanVien = function(){
        if (this.gioLam >= 192){
            return 'Xuất sắc'
        } else if(this.gioLam >= 176){
            return 'Giỏi'
        } else if(this.gioLam >= 160){
            return 'Khá'
        } else{
            return 'Trung bình'
        }
    };
}