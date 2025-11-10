// ==========================================================
// SCRIPT.JS - LOGIC GAME CNH 4.0
// Đánh giá tính 'consistency' (nhất quán) dựa trên định hướng Đổi mới Sáng tạo & Bền vững
// ==========================================================
const GAME_DATA = [
    // --- VÒNG 1: THỬ THÁCH "ĐẦU TƯ VỐN & CÔNG NGHỆ" ---
    {
        round: 1,
        title: "Ưu tiên Thu hút Đầu tư",
        situation: "Một tập đoàn nước ngoài cam kết xây dựng nhà máy lắp ráp công nghệ cũ, tạo ra 10.000 việc làm nhưng gây ô nhiễm môi trường nhẹ. Tập đoàn khác đầu tư nghiên cứu AI, chỉ tạo 500 việc làm nhưng cần ưu đãi thuế lớn.",
        decisions: {
            PolicyMaker: [
                { text: "Ưu tiên tập đoàn AI, chấp nhận ưu đãi lớn và ít việc làm hơn, lấy đổi mới làm trọng tâm.", consistency: true, feedback: "Quyết định nhất quán với yêu cầu khách quan gắn CNH với Đổi mới Sáng tạo và tránh 'CNH nâu'." },
                { text: "Chọn tập đoàn lắp ráp cũ để giải quyết thất nghiệp trước mắt, ưu tiên số lượng việc làm.", consistency: false, feedback: "Quyết định đi ngược lại định hướng bền vững và có nguy cơ khiến Việt Nam bị mắc kẹt vào chuỗi giá trị thấp." }
            ]
        }
    },

    // --- VÒNG 2: THỬ THÁCH "LAO ĐỘNG & BẤT BÌNH ĐẲNG" ---
    {
        round: 2,
        title: "Tự động hóa và Nguồn nhân lực",
        situation: "Tự động hóa sản xuất đang khiến 50% lao động giản đơn có nguy cơ mất việc trong 5 năm tới, gây ra bất bình đẳng xã hội nghiêm trọng.",
        decisions: {
            PolicyMaker: [
                { text: "Ban hành chính sách miễn phí 100% chi phí đào tạo lại nghề cho người lao động, tập trung vào kỹ năng số và công nghệ xanh.", consistency: true, feedback: "Biện pháp phù hợp để giải quyết mâu thuẫn xã hội và nâng cấp nguồn lực, đảm bảo phát triển bao trùm." },
                { text: "Cấm các doanh nghiệp áp dụng tự động hóa quá nhanh để bảo vệ việc làm truyền thống.", consistency: false, feedback: "Quyết định này đi ngược lại tính tất yếu của đột phá công nghệ, kìm hãm sự phát triển của lực lượng sản xuất." }
            ]
        }
    },

    // --- VÒNG 3: THỬ THÁCH "PHÁT TRIỂN BỀN VỮNG & MÔI TRƯỜNG" ---
    {
        round: 3,
        title: "Mô hình Kinh tế Xanh",
        situation: "Nhu cầu năng lượng tăng vọt do CNH, buộc chính phủ phải chọn giữa xây dựng thêm nhà máy nhiệt điện than (rẻ, nhanh) hoặc đầu tư lớn vào năng lượng tái tạo (đắt, chậm hơn).",
        decisions: {
            PolicyMaker: [
                { text: "Thúc đẩy đầu tư công lớn vào năng lượng tái tạo (điện mặt trời, gió) với cam kết giảm phát thải bằng 0 vào năm 2050.", consistency: true, feedback: "Chiến lược phù hợp với yêu cầu phát triển bền vững, tận dụng ưu thế thiên nhiên để tránh CNH nâu." },
                { text: "Xây thêm nhiệt điện than để đảm bảo đủ năng lượng ngay lập tức với chi phí thấp nhất.", consistency: false, feedback: "Quyết định này chỉ giải quyết được vấn đề ngắn hạn nhưng gây ra chi phí xã hội lớn về môi trường, đi ngược lại định hướng bền vững." }
            ]
        }
    }
];

let currentRole = null;
let currentRound = 0;
let consistencyScore = 0;
const totalRounds = GAME_DATA.length;

function startGame(role) {
    currentRole = role;
    currentRound = 0;
    consistencyScore = 0;
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('game-rounds').style.display = 'block';
    loadRound();
}

function loadRound() {
    currentRound++;
    const roundData = GAME_DATA.find(data => data.round === currentRound);
    
    if (!roundData) {
        endGame();
        return;
    }

    document.getElementById('round-number').textContent = currentRound;
    document.getElementById('round-title').textContent = roundData.title;
    document.getElementById('situation-description').textContent = roundData.situation;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; 
    document.getElementById('feedback-result').innerHTML = ''; 

    const roleDecisions = roundData.decisions[currentRole];
    roleDecisions.forEach((decision, index) => {
        const button = document.createElement('button');
        button.textContent = decision.text;
        button.onclick = () => handleDecision(decision); 
        optionsContainer.appendChild(button);
    });
}

function handleDecision(decision) {
    if (decision.consistency) {
        consistencyScore++;
    }
    
    const feedbackResult = document.getElementById('feedback-result');
    feedbackResult.innerHTML = `
        <p style="font-weight: bold; color: ${decision.consistency ? 'green' : 'red'};">Kết quả: ${decision.consistency ? 'NHẤT QUÁN' : 'KHÔNG NHẤT QUÁN'}</p>
        <p><strong>Phân tích KTCT:</strong> ${decision.feedback}</p>
        <button onclick="loadRound()" class="button primary">Tiếp tục Vòng ${currentRound < totalRounds ? currentRound + 1 : 'Kết thúc'} →</button>
    `;
    
    document.querySelectorAll('.decision-box button').forEach(btn => btn.disabled = true);
}

function endGame() {
    let rating = "";

    if (consistencyScore === totalRounds) {
        rating = "Xuất sắc! Bạn đã đưa ra các quyết định hoàn toàn nhất quán với định hướng CNH gắn với Đổi mới Sáng tạo và Phát triển Bền vững.";
    } else if (consistencyScore >= totalRounds * 0.5) {
        rating = "Tốt! Bạn đã nắm vững các nguyên tắc cơ bản nhưng cần củng cố thêm về sự cân bằng giữa tăng trưởng và bền vững.";
    } else {
        rating = "Hãy xem lại phần Lý luận. Các quyết định của bạn chưa phản ánh đúng yêu cầu khách quan của CNH hiện đại.";
    }

    const gameRoundsSection = document.getElementById('game-rounds');
    gameRoundsSection.innerHTML = `
        <h2>🏆 Trò Chơi Kết Thúc 🏆</h2>
        <p>Bạn đã hoàn thành trò chơi với <strong>${consistencyScore}/${totalRounds} điểm nhất quán</strong>.</p>
        <div style="padding: 15px; background-color: #f0f8ff; border: 1px solid #d0e8f8; border-radius: 5px; color: #333;">
            <p><strong>Đánh giá:</strong> ${rating}</p>
        </div>
        <a href="index.html" class="button primary" style="width:100%; margin-top: 20px;">Quay lại Trang chủ</a>
    `;
}