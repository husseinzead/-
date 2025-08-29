import React from 'react';

export const WelcomeSplash: React.FC = () => {
    return (
        <div className="text-center bg-gray-800/50 border border-gray-700 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary-400 mb-2">مرحباً بك في دليل الفني المحترف</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
                أدخل وصف العطل أو المشكلة التي تواجهك في شريط البحث أعلاه (مثال: "مشكلة الشحن في سامسونج S21" أو "استبدال بطارية هواوي P30 Pro") للوصول الفوري إلى أفضل الشروحات من يوتيوب والمواقع العالمية الموثوقة.
            </p>
        </div>
    );
};