# מדריך Deployment ל-Vercel עם הדומיין maozdigital.com

## שלב 1: הכנת הפרויקט

✅ **הושלם**: עדכנתי את הקבצים הבאים:
- `vercel.json` - קובץ הגדרות Vercel
- `package.json` - שינוי שם הפרויקט ל-"maozdigital"
- `src/app/layout.tsx` - הוספת metadata עבור הדומיין החדש

## שלב 2: התקנת Vercel CLI

```bash
npm install -g vercel
```

## שלב 3: התחברות ל-Vercel

```bash
vercel login
```

## שלב 4: Deploy הפרויקט

```bash
cd /Users/omermaoz/my-web
vercel
```

במהלך ה-deploy תצטרך לענות על השאלות:
- **Set up and deploy?** → Yes
- **Which scope?** → בחר את החשבון שלך
- **Link to existing project?** → No (פרויקט חדש)
- **What's your project's name?** → maozdigital
- **In which directory is your code located?** → ./

## שלב 5: חיבור הדומיין

1. היכנס ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט "maozdigital"
3. לך ל-**Settings** → **Domains**
4. לחץ על **Add Domain**
5. הכנס: `maozdigital.com`
6. לחץ על **Add**

## שלב 6: הגדרת DNS

ב-Vercel תראה רשימת DNS records שצריך להוסיף. עבור אל ספק הדומיין שלך והוסף:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

## שלב 7: בדיקת החיבור

1. המתן 5-10 דקות להפצת ה-DNS
2. בדוק את האתר ב: https://maozdigital.com
3. בדוק גם: https://www.maozdigital.com

## שלב 8: SSL Certificate

Vercel ייצור אוטומטית SSL certificate עבור הדומיין שלך.

## הערות חשובות:

- הפרויקט מוכן ל-production עם כל ההגדרות הנדרשות
- ה-metadata עודכן עבור SEO
- ה-API routes יעבדו ב-Vercel
- ה-caching מוגדר אופטימלית

## בעיות נפוצות:

1. **DNS לא מתעדכן**: המתן עד 24 שעות
2. **SSL לא עובד**: בדוק שה-DNS מוגדר נכון
3. **Build נכשל**: בדוק שה-Node.js version הוא 20.x

## תמיכה:

אם יש בעיות, בדוק את:
- Vercel Dashboard → Functions logs
- Vercel Dashboard → Build logs
