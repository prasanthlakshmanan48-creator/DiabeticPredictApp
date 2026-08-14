import os
import json
import csv

# Directory paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
JSON_BACKEND_PATH = os.path.join(BASE_DIR, 'users_dataset.json')
CSV_EXPORT_PATH = os.path.join(PROJECT_ROOT, 'user_credentials_100_individuals.csv')
JSON_EXPORT_PATH = os.path.join(PROJECT_ROOT, 'user_credentials_100_individuals.json')

# First Names & Last Names Pools for Realistic Generation
FIRST_NAMES_MALE = [
    "Alex", "Marcus", "David", "James", "Robert", "Michael", "William", "Richard", "Joseph", "Thomas",
    "Charles", "Daniel", "Matthew", "Anthony", "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth",
    "Joshua", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan",
    "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon",
    "Benjamin", "Samuel", "Gregory", "Frank", "Alexander", "Raymond", "Patrick", "Jack", "Dennis", "Jerry"
]

FIRST_NAMES_FEMALE = [
    "Sarah", "Priya", "Emily", "Eleanor", "Grace", "Hannah", "Sunita", "Sophia", "Olivia", "Emma",
    "Ava", "Isabella", "Mia", "Amelia", "Harper", "Evelyn", "Abigail", "Ella", "Elizabeth", "Camila",
    "Luna", "Sofia", "Avery", "Mila", "Aria", "Scarlett", "Penelope", "Layla", "Chloe", "Victoria",
    "Madison", "Eleanor", "Grace", "Nora", "Riley", "Zoey", "Hannah", "Hazel", "Lily", "Ellie",
    "Violet", "Lillian", "Zoe", "Stella", "Aurora", "Natalie", "Emery", "Maya", "Elena", "Naomi"
]

LAST_NAMES = [
    "Jenkins", "Rivera", "Sharma", "Chen", "Lakshmanan", "Vance", "Wright", "Miller", "Garcia", "Abbott",
    "Hopper", "Rao", "Santana", "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor",
    "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
    "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres",
    "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell"
]

DEPARTMENTS = [
    "Diabetes & Endocrinology",
    "Internal Medicine & Cardiology",
    "Community Preventive Care",
    "Patient Triage & Counseling",
    "Bio-informatics & AI Validation",
    "Clinical Research Labs",
    "Metabolic & Vascular Diagnostics",
    "Nutrition & Dietary Health",
    "Pharmacy & Pharmacogenomics",
    "Pediatric Endocrinology",
    "Personal Wellness & Self-Monitoring",
    "Platform Security & DevOps"
]

ROLES_AND_BADGES = [
    ("Lead Clinical Endocrinologist", "Clinician", "Specializing in Type-1 & Type-2 diabetes management, continuous glucose monitoring, and beta-cell therapies."),
    ("Chief Medical Officer", "Doctor", "Leading digital diagnostics, cardiac-metabolic risks, and clinical screening protocols."),
    ("Preventive Medicine Specialist", "Specialist", "Focusing on early glycemic biomarker detection, lifestyle interventions, and dietary reversal."),
    ("Certified Diabetes Educator (CDCES)", "Nurse / Educator", "Guiding individuals on glucose self-monitoring, insulin regulation, and holistic nutrition plans."),
    ("Patient & Health Explorer", "Patient", "Actively tracking biometric trends, fasting blood glucose, and preventive lifestyle habits."),
    ("Clinical Data Scientist & AI Auditor", "Researcher", "Auditing ensemble machine learning models, ROC-AUC performance curves, and algorithmic metrics."),
    ("System Administrator", "Administrator", "Full platform access, audit logs, user management, and system health governance."),
    ("Clinical Research Fellow", "Researcher", "Investigating novel biomarkers for pre-diabetes identification and metabolic health tracking."),
    ("Registered Clinical Dietitian", "Dietitian", "Designing low-glycemic dietary interventions, macronutrient partitioning, and diabetic meal plans."),
    ("Staff Triage Nurse", "Nurse / Educator", "Managing daily patient intake, vital signs logging, and blood pressure monitoring."),
    ("Diagnostic Lab Director", "Specialist", "Supervising automated HbA1c assays, lipid profile panels, and plasma glucose test accuracy."),
    ("Metabolic Care Coordinator", "Clinician", "Coordinating multi-disciplinary care teams for high-risk diabetic and hypertensive patients.")
]

AVATAR_POOL = [
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594824813620-4b95f1906a5b?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop"
]

def generate_100_plus_users():
    users = []
    
    # 1. Include core preset users
    core_users = [
        {
            "id": 1,
            "fullname": "Dr. Sarah Jenkins",
            "email": "sarah.jenkins@aihealth.org",
            "password": "password123",
            "role": "Lead Clinical Endocrinologist",
            "department": "Diabetes & Endocrinology",
            "bio": "Specializing in Type-1 & Type-2 diabetes management, continuous glucose monitoring, and beta-cell therapies.",
            "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop",
            "badge": "Clinician"
        },
        {
            "id": 2,
            "fullname": "Dr. Alex Rivera",
            "email": "alex.rivera@aihealth.org",
            "password": "password123",
            "role": "Chief Medical Officer",
            "department": "Internal Medicine & Cardiology",
            "bio": "Leading digital diagnostics, cardiac-metabolic risks, and clinical screening protocols.",
            "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop",
            "badge": "Doctor"
        },
        {
            "id": 3,
            "fullname": "Dr. Priya Sharma",
            "email": "priya.sharma@healthclinic.org",
            "password": "password123",
            "role": "Preventive Medicine Specialist",
            "department": "Community Preventive Care",
            "bio": "Focusing on early glycemic biomarker detection, lifestyle interventions, and dietary reversal.",
            "avatar": "https://images.unsplash.com/photo-1594824813620-4b95f1906a5b?q=80&w=250&auto=format&fit=crop",
            "badge": "Specialist"
        },
        {
            "id": 4,
            "fullname": "Nurse Emily Chen",
            "email": "emily.chen@carecenter.org",
            "password": "password123",
            "role": "Certified Diabetes Educator (CDCES)",
            "department": "Patient Triage & Counseling",
            "bio": "Guiding individuals on glucose self-monitoring, insulin regulation, and holistic nutrition plans.",
            "avatar": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=250&auto=format&fit=crop",
            "badge": "Nurse / Educator"
        },
        {
            "id": 5,
            "fullname": "Prasanth Lakshmanan",
            "email": "prasanth@gmail.com",
            "password": "password123",
            "role": "Patient & Health Explorer",
            "department": "Personal Wellness & Self-Monitoring",
            "bio": "Actively tracking biometric trends, fasting blood glucose, and preventive lifestyle habits.",
            "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop",
            "badge": "Patient"
        },
        {
            "id": 6,
            "fullname": "Marcus Vance",
            "email": "marcus.vance@metaboliclabs.io",
            "password": "password123",
            "role": "Clinical Data Scientist & AI Auditor",
            "department": "Bio-informatics & AI Validation",
            "bio": "Auditing ensemble machine learning models, ROC-AUC performance curves, and algorithmic metrics.",
            "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=250&auto=format&fit=crop",
            "badge": "Researcher"
        },
        {
            "id": 7,
            "fullname": "System Administrator",
            "email": "admin@diabetex.ai",
            "password": "admin123",
            "role": "System Administrator",
            "department": "Platform Security & DevOps",
            "bio": "Full platform access, audit logs, user management, and system health governance.",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
            "badge": "Administrator"
        }
    ]

    users.extend(core_users)
    seen_emails = {u["email"].lower() for u in core_users}

    # Generate additional unique individuals up to 108 users
    idx = 8
    fn_m_idx = 0
    fn_f_idx = 0
    ln_idx = 0

    while idx <= 108:
        is_female = (idx % 2 == 0)
        if is_female:
            fname = FIRST_NAMES_FEMALE[fn_f_idx % len(FIRST_NAMES_FEMALE)]
            fn_f_idx += 1
            prefix = "Dr. " if (idx % 3 == 0) else ("Nurse " if (idx % 4 == 0) else "")
        else:
            fname = FIRST_NAMES_MALE[fn_m_idx % len(FIRST_NAMES_MALE)]
            fn_m_idx += 1
            prefix = "Dr. " if (idx % 3 == 0) else ("Mr. " if (idx % 5 == 0) else "")

        lname = LAST_NAMES[ln_idx % len(LAST_NAMES)]
        ln_idx += 1

        fullname = f"{prefix}{fname} {lname}".strip()
        email_domain = "aihealth.org" if (idx % 2 == 0) else ("healthclinic.org" if (idx % 3 == 0) else "metaboliclabs.io")
        email = f"{fname.lower()}.{lname.lower()}{idx}@{email_domain}".replace("..", ".")

        if email in seen_emails:
            email = f"{fname.lower()}{idx}.{lname.lower()}@diabetex.org"
        seen_emails.add(email)

        role, badge, bio_template = ROLES_AND_BADGES[idx % len(ROLES_AND_BADGES)]
        dept = DEPARTMENTS[idx % len(DEPARTMENTS)]
        password = "password123" if idx % 10 != 0 else "Pass@2026!"
        avatar = AVATAR_POOL[idx % len(AVATAR_POOL)]

        user_obj = {
            "id": idx,
            "fullname": fullname,
            "email": email,
            "password": password,
            "role": role,
            "department": dept,
            "bio": f"{fullname} is a dedicated professional in {dept}. {bio_template}",
            "avatar": avatar,
            "badge": badge
        }

        users.append(user_obj)
        idx += 1

    return users

def main():
    users = generate_100_plus_users()
    print(f"Generated {len(users)} user credentials.")

    # Save to backend/users_dataset.json
    with open(JSON_BACKEND_PATH, 'w', encoding='utf-8') as f:
        json.dump(users, f, indent=2)
    print(f"Saved backend JSON to: {JSON_BACKEND_PATH}")

    # Export to root CSV
    fieldnames = ["id", "fullname", "email", "password", "role", "department", "badge", "bio"]
    with open(CSV_EXPORT_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for u in users:
            writer.writerow({
                "id": u["id"],
                "fullname": u["fullname"],
                "email": u["email"],
                "password": u["password"],
                "role": u["role"],
                "department": u["department"],
                "badge": u["badge"],
                "bio": u["bio"]
            })
    print(f"Exported CSV to: {CSV_EXPORT_PATH}")

    # Export to root JSON
    with open(JSON_EXPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(users, f, indent=2)
    print(f"Exported JSON to: {JSON_EXPORT_PATH}")

if __name__ == '__main__':
    main()
