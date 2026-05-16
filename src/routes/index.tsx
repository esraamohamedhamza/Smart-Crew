import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // أول ما المستخدم يفتح الرابط الرئيسي /، بنقول للـ Router وّديه فوراً لتصميم الـ app_
    throw redirect({
      to: '/',
    })
  },
})
